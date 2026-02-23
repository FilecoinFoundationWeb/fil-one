/**
 * HeroLens — WebGL glass-lens overlay for the hero headline.
 *
 * Tweak constants are at the top of this file.
 */
import { useEffect, useRef } from "react";

// ─── Tweak constants ──────────────────────────────────────────────────────────
const RADIUS_FRACTION = 0.18;   // lens radius as fraction of canvas width
const REFRACTION      = 0.048;  // barrel-warp strength
const BLUR_STRENGTH   = 16.0;   // blur spread in canvas pixels
const BLUR_TAPS       = 12;     // blur sample count (baked into shader)
const EDGE_FEATHER    = 0.20;   // feather width as fraction of radius
const DRIFT_SPEED     = 0.00022;// radians/ms for autonomous drift
const FOLLOW_LERP     = 0.07;   // mouse-follow smoothing factor
const DRIFT_RADIUS_X  = 0.28;   // drift ellipse half-width (fraction of canvas)
const DRIFT_RADIUS_Y  = 0.38;   // drift ellipse half-height
// ─────────────────────────────────────────────────────────────────────────────

// ── Shaders ───────────────────────────────────────────────────────────────────

const VERT = /* glsl */`
  attribute vec2 a_pos;
  varying   vec2 v_uv;
  void main() {
    // v_uv (0,0)=bottom-left matches the WebGL convention.
    // Because we upload the texture with UNPACK_FLIP_Y_WEBGL=true the canvas
    // pixel origin (top-left) maps to UV (0,1), which is what we want.
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// BLUR_TAPS is spliced in at JS build time via .replace()
const FRAG_TEMPLATE = /* glsl */`
  precision highp float;

  uniform sampler2D u_tex;
  uniform vec2      u_res;       // canvas physical size (px)
  uniform vec2      u_center;    // lens centre in UV [0,1] — WebGL orientation
  uniform float     u_radius;    // lens radius in UV (fraction of width)
  uniform float     u_refr;      // refraction strength
  uniform float     u_blur;      // blur spread in px
  uniform float     u_feather;   // feather fraction of radius

  varying vec2 v_uv;

  float rand2(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2  uv    = v_uv;
    float ar    = u_res.x / u_res.y;

    // Aspect-corrected distance from lens centre
    vec2  d     = (uv - u_center) * vec2(ar, 1.0);
    float dist  = length(d);
    float r     = u_radius * ar;

    // ── Lens mask (feathered circle) ─────────────────────────────────────────
    float mask  = 1.0 - smoothstep(r * (1.0 - u_feather),
                                   r * (1.0 + u_feather * 0.5),
                                   dist);

    // ── Refraction offset (barrel, zero at centre) ───────────────────────────
    float t       = clamp(dist / r, 0.0, 1.0);
    vec2  dDir    = normalize(d + vec2(1e-5));
    vec2  refrUV  = uv + (dDir / vec2(ar, 1.0)) * (u_refr * t * t);

    // ── Multi-tap rotational blur ────────────────────────────────────────────
    float jitter = rand2(uv) * 0.8;
    vec4  blurred = vec4(0.0);
    float wSum    = 0.0;
    for (int i = 0; i < ##TAPS##; i++) {
      float fi  = float(i) + jitter;
      float ang = fi * (6.28318 / float(##TAPS##));
      float rad = (u_blur / u_res.x) * (0.4 + 0.6 * fi / float(##TAPS##));
      vec2  sUV = refrUV + vec2(cos(ang), sin(ang)) * rad;
      blurred  += texture2D(u_tex, sUV);
      wSum     += 1.0;
    }
    blurred /= wSum;

    // Blend: sharp at centre, blurry toward edge
    vec4 sharp = texture2D(u_tex, refrUV);
    vec4 col   = mix(sharp, blurred, smoothstep(0.0, 0.85, t));

    // ── Chromatic aberration (rim only) ──────────────────────────────────────
    float ca    = u_refr * 0.65 * smoothstep(0.5, 1.0, t);
    vec2  caOff = (dDir / vec2(ar, 1.0)) * ca;
    col.r = mix(col.r, texture2D(u_tex, refrUV + caOff).r,        mask * 0.7);
    col.b = mix(col.b, texture2D(u_tex, refrUV - caOff).b,        mask * 0.7);

    // ── Specular highlight (top-left sheen) ──────────────────────────────────
    vec2  hlDir = normalize(vec2(-0.55, -0.75));
    float spec  = smoothstep(r * 0.65, 0.0, dist)
                * pow(max(dot(normalize(d), hlDir) + 0.55, 0.0), 3.0)
                * 0.15;
    col.rgb    += spec;

    // ── Composite ────────────────────────────────────────────────────────────
    // Outside the lens: sample the unwarped texture (matches the page bg exactly).
    // Inside the lens: the warped/blurred/aberrated result.
    // The feathered mask blends between them at the edge.
    vec4 bg = texture2D(u_tex, uv);
    gl_FragColor = mix(bg, col, mask);
  }
`;

// ── WebGL helpers ─────────────────────────────────────────────────────────────

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error("Shader error:", gl.getShaderInfoLog(s));
  return s;
}

function buildProgram(gl: WebGLRenderingContext, vert: string, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER,   vert));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    console.error("Program error:", gl.getProgramInfoLog(p));
  return p;
}

/**
 * Draw the headline text into an offscreen canvas that is exactly
 * `canvasW × canvasH` physical pixels (matching the WebGL surface),
 * then upload it as a texture.
 *
 * UNPACK_FLIP_Y_WEBGL is set before upload so (u,v)=(0,0) maps to the
 * bottom-left of the canvas — matching the WebGL convention without any
 * UV gymnastics in the shader.
 */
/**
 * Rasterise `h1` into an offscreen canvas using the SVG <foreignObject>
 * trick — the browser renders the actual DOM node, so font, size, spacing,
 * and vertical position are pixel-perfect by definition.
 *
 * Returns a promise because Image.onload is async.
 */
function rasteriseH1(
  h1: HTMLHeadingElement,
  canvasW: number,
  canvasH: number,
  dpr: number,
  bg: string,
): Promise<HTMLCanvasElement> {
  const cssW = canvasW / dpr;
  const cssH = canvasH / dpr;

  // Serialise the h1 node with all its inline styles preserved.
  // We clone it so we can force display:block and exact dimensions.
  const clone = h1.cloneNode(true) as HTMLElement;
  clone.style.cssText = window.getComputedStyle(h1).cssText;
  clone.style.margin  = "0";
  clone.style.padding = "0";
  clone.style.width   = `${cssW}px`;
  clone.style.height  = `${cssH}px`;
  clone.style.display = "block";
  // Suppress the hero fade-in animation on the clone
  clone.style.animation = "none";
  clone.style.opacity   = "1";
  clone.style.transform = "none";

  // Wrap in a sized <div> that sets the background
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    `width:${cssW}px;height:${cssH}px;background:${bg};overflow:hidden;`;
  wrapper.appendChild(clone);

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute("width",  String(canvasW));
  svg.setAttribute("height", String(canvasH));

  const fo = document.createElementNS(svgNS, "foreignObject");
  fo.setAttribute("x", "0"); fo.setAttribute("y", "0");
  fo.setAttribute("width",  String(canvasW));
  fo.setAttribute("height", String(canvasH));
  // foreignObject content must be in XHTML namespace
  const xhtmlDiv = document.createElement("div");
  xhtmlDiv.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  xhtmlDiv.style.cssText =
    `width:${canvasW}px;height:${canvasH}px;transform:scale(${dpr});transform-origin:top left;`;
  xhtmlDiv.appendChild(wrapper);
  fo.appendChild(xhtmlDiv);
  svg.appendChild(fo);

  const svgBlob = new Blob(
    [`<?xml version="1.0" encoding="UTF-8"?>`, new XMLSerializer().serializeToString(svg)],
    { type: "image/svg+xml" },
  );
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const off = document.createElement("canvas");
      off.width  = canvasW;
      off.height = canvasH;
      const ctx  = off.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      resolve(off);
    };
    img.onerror = reject;
    img.src = url;
  });
}

function uploadTexture(
  gl: WebGLRenderingContext,
  off: HTMLCanvasElement,
  existingTex: WebGLTexture | null,
): WebGLTexture {
  if (existingTex) gl.deleteTexture(existingTex);
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface HeroLensProps {
  h1Ref: React.RefObject<HTMLHeadingElement>;
  /** Background color of the hero section — must match the page exactly so
   *  the canvas is invisible outside the lens circle. */
  bg?: string;
}

const HeroLens: React.FC<HeroLensProps> = ({ h1Ref, bg = "#ffffff" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const h1     = h1Ref.current;
    if (!canvas || !h1) return;

    const dpr = window.devicePixelRatio || 1;
    // alpha:false — canvas is fully opaque; outside the lens it matches the bg exactly
    const gl  = canvas.getContext("webgl", { alpha: false, premultipliedAlpha: false });
    if (!gl) return;

    // ── Build GPU program ────────────────────────────────────────────────────
    const frag = FRAG_TEMPLATE.replace(/##TAPS##/g, String(BLUR_TAPS));
    const prog = buildProgram(gl, VERT, frag);

    // Fullscreen quad (triangle strip)
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(prog);
    const uRes    = gl.getUniformLocation(prog, "u_res");
    const uCenter = gl.getUniformLocation(prog, "u_center");
    const uRadius = gl.getUniformLocation(prog, "u_radius");
    const uRefr   = gl.getUniformLocation(prog, "u_refr");
    const uBlur   = gl.getUniformLocation(prog, "u_blur");
    const uFeat   = gl.getUniformLocation(prog, "u_feather");

    gl.uniform1f(uRefr, REFRACTION);
    gl.uniform1f(uBlur, BLUR_STRENGTH);
    gl.uniform1f(uFeat, EDGE_FEATHER);
    gl.uniform1i(gl.getUniformLocation(prog, "u_tex"), 0);

    // ── State ────────────────────────────────────────────────────────────────
    let tex: WebGLTexture | null = null;
    let lensUV   = { x: 0.5, y: 0.5 };
    let targetUV = { x: 0.5, y: 0.5 };
    let isHovered = false;
    let raf = 0;
    let startTime = 0;

    // ── Resize / retexture ───────────────────────────────────────────────────
    function resize() {
      const cssW = h1.offsetWidth;
      const cssH = h1.offsetHeight;
      if (!cssW || !cssH) return;

      const pw = Math.round(cssW * dpr);
      const ph = Math.round(cssH * dpr);

      canvas.width  = pw;
      canvas.height = ph;
      canvas.style.width  = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.style.position = "absolute";
      canvas.style.top  = "0";
      canvas.style.left = "0";

      gl.viewport(0, 0, pw, ph);
      gl.uniform2f(uRes, pw, ph);
      gl.uniform1f(uRadius, RADIUS_FRACTION);

      // Rasterise h1 via foreignObject (async) then upload as texture
      const prevTex = tex;
      rasteriseH1(h1, pw, ph, dpr, bg).then((off) => {
        tex = uploadTexture(gl, off, prevTex);
      }).catch(() => { /* ignore cross-origin errors in dev */ });
    }

    // ── Render loop ──────────────────────────────────────────────────────────
    function draw(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      if (!isHovered) {
        // Lissajous drift — starts near centre
        const angle  = elapsed * DRIFT_SPEED - Math.PI / 2;
        targetUV.x   = 0.5 + Math.cos(angle)         * DRIFT_RADIUS_X;
        targetUV.y   = 0.5 + Math.sin(angle * 1.618)  * DRIFT_RADIUS_Y * 0.55;
      }

      lensUV.x += (targetUV.x - lensUV.x) * FOLLOW_LERP;
      lensUV.y += (targetUV.y - lensUV.y) * FOLLOW_LERP;

      if (tex) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        // WebGL v_uv.y=0 is bottom; our texture is flipped on upload,
        // so we pass the logical Y directly (no 1-y flip needed).
        gl.uniform2f(uCenter, lensUV.x, 1.0 - lensUV.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      raf = requestAnimationFrame(draw);
    }

    // ── Mouse events (attached to h1, canvas is pointer-events:none) ─────────
    function onMouseMove(e: MouseEvent) {
      const r = h1.getBoundingClientRect();
      targetUV.x = (e.clientX - r.left) / r.width;
      targetUV.y = (e.clientY - r.top)  / r.height;
    }
    function onMouseEnter() { isHovered = true; }
    function onMouseLeave() { isHovered = false; }

    h1.addEventListener("mousemove",  onMouseMove);
    h1.addEventListener("mouseenter", onMouseEnter);
    h1.addEventListener("mouseleave", onMouseLeave);

    // Re-texture when fonts finish loading
    const ffs = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (ffs) ffs.ready.then(resize);

    // Re-size when h1 changes dimensions
    const ro = new ResizeObserver(resize);
    ro.observe(h1);
    resize();

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      h1.removeEventListener("mousemove",  onMouseMove);
      h1.removeEventListener("mouseenter", onMouseEnter);
      h1.removeEventListener("mouseleave", onMouseLeave);
      if (tex) gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [h1Ref]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 10 }}
    />
  );
};

export default HeroLens;
