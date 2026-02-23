/**
 * HeroLens — WebGL glass-lens overlay for the hero headline.
 *
 * Tweak constants are at the top of this file.
 */
import { useEffect, useRef } from "react";

// ─── Tweak constants ──────────────────────────────────────────────────────────
const RADIUS_FRACTION = 0.18;     // lens radius as fraction of canvas width
const REFRACTION = 0.045;         // strength of barrel-warp (UV displacement)
const BLUR_STRENGTH = 18.0;       // pixel spread of the blur (in canvas pixels)
const BLUR_TAPS = 12;             // number of blur samples (must be int literal in shader)
const EDGE_FEATHER = 0.18;        // fraction of radius used for soft edge fade-out
const DRIFT_SPEED = 0.00022;      // autonomous drift speed (radians / ms)
const FOLLOW_LERP = 0.07;         // mouse-follow smoothing (0 = instant, 1 = never)
const DRIFT_RADIUS_X = 0.30;      // autonomous drift ellipse, fraction of canvas width
const DRIFT_RADIUS_Y = 0.42;      // autonomous drift ellipse, fraction of canvas height
// ─────────────────────────────────────────────────────────────────────────────

const VERT = /* glsl */ `
  attribute vec2 a_pos;
  varying   vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// BLUR_TAPS is baked in at compile time via string replacement
const FRAG_TEMPLATE = /* glsl */ `
  precision highp float;

  uniform sampler2D u_tex;
  uniform vec2      u_resolution;   // canvas size in CSS pixels * dpr
  uniform vec2      u_lensCenter;   // lens centre in UV [0,1]
  uniform float     u_radius;       // lens radius in UV units
  uniform float     u_refraction;
  uniform float     u_blurStrength; // blur pixel spread in canvas px
  uniform float     u_feather;      // feather fraction of radius

  varying vec2 v_uv;

  // Pseudo-random for dithering jitter
  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv   = v_uv;
    // Correct for aspect ratio so the lens is circular
    vec2 asp  = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 diff = (uv - u_lensCenter) * asp;
    float dist = length(diff);
    float r    = u_radius * asp.x;   // radius in aspect-corrected space

    // ── Lens mask ────────────────────────────────────────────────────────────
    float inner = r * (1.0 - u_feather);
    float outer = r * (1.0 + u_feather * 0.5);
    float mask  = 1.0 - smoothstep(inner, outer, dist);

    // ── Refraction (barrel warp) ─────────────────────────────────────────────
    // Stronger near the edge, zero at centre
    float t           = clamp(dist / r, 0.0, 1.0);
    float refrAmt     = u_refraction * t * t;
    vec2  refrDir     = normalize(diff + vec2(0.0001)); // safe normalise
    vec2  refrUV      = uv + refrDir * refrAmt;

    // ── Multi-tap blur ───────────────────────────────────────────────────────
    vec2  pixelSize   = vec2(1.0) / u_resolution;
    float spread      = u_blurStrength * pixelSize.x;

    vec4  col         = vec4(0.0);
    float wTotal      = 0.0;
    float jitter      = rand(uv) * 0.5;

    for (int i = 0; i < ##TAPS##; i++) {
      float fi   = float(i) + jitter;
      float angle = fi * (6.28318 / float(##TAPS##));
      float s    = sin(angle);
      float c    = cos(angle);
      // Vary radius of each tap for fuller coverage
      float rad  = spread * (0.5 + 0.5 * (fi / float(##TAPS##)));
      vec2  sUV  = refrUV + vec2(c, s) * rad;
      float w    = 1.0;
      col   += texture2D(u_tex, sUV) * w;
      wTotal += w;
    }
    col /= wTotal;

    // Also sample centre (unblurred source)
    vec4 centreCol = texture2D(u_tex, refrUV);
    // Blend: more blur near edge, less at centre
    float blurMix  = smoothstep(0.0, 0.8, t);
    col = mix(centreCol, col, blurMix);

    // ── Chromatic aberration fringe near the edge ────────────────────────────
    float chromaMag = u_refraction * 0.7 * smoothstep(0.55, 1.0, t);
    vec2  chromaOff = refrDir * chromaMag;
    float rCh = texture2D(u_tex, refrUV + chromaOff * 1.0).r;
    float gCh = texture2D(u_tex, refrUV                  ).g;
    float bCh = texture2D(u_tex, refrUV - chromaOff * 1.0).b;
    vec4  chromaCol = vec4(rCh, gCh, bCh, col.a);
    float chromaMix = smoothstep(0.5, 1.0, t) * mask;
    col = mix(col, chromaCol, chromaMix * 0.65);

    // ── Specular highlight (faint white sheen) ────────────────────────────────
    vec2  highlightDir = normalize(vec2(-0.6, -0.8));
    float spec = smoothstep(0.6, 0.0, dist / r)
               * pow(max(dot(normalize(diff / (r + 0.0001)), highlightDir) + 0.5, 0.0), 2.5)
               * 0.18;
    col.rgb += spec;

    // ── Outer feather blend (transparent outside the lens) ───────────────────
    gl_FragColor = mix(texture2D(u_tex, uv), col, mask);
  }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(s));
  }
  return s;
}

function buildProgram(gl: WebGLRenderingContext, vert: string, frag: string) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(prog));
  }
  return prog;
}

function makeOffscreenTexture(
  gl: WebGLRenderingContext,
  h1: HTMLHeadingElement,
  dpr: number,
): { tex: WebGLTexture; w: number; h: number } {
  const rect = h1.getBoundingClientRect();
  // Add padding so the lens can see a bit outside the exact bounding box
  const PAD = 40 * dpr;
  const w = Math.round(rect.width  * dpr + PAD * 2);
  const h = Math.round(rect.height * dpr + PAD * 2);

  const offscreen = document.createElement("canvas");
  offscreen.width  = w;
  offscreen.height = h;
  const ctx = offscreen.getContext("2d")!;

  // Background (match the page)
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, w, h);

  // Read computed style from the real h1
  const cs = window.getComputedStyle(h1);
  ctx.font         = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  ctx.fillStyle    = cs.color;
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";

  // letter-spacing: need to draw char-by-char for accurate spacing
  const letterSpacing = parseFloat(cs.letterSpacing) || 0;
  const text = h1.textContent ?? "";

  if (letterSpacing === 0) {
    ctx.fillText(text, w / 2, h / 2);
  } else {
    // Measure total width with spacing
    const metrics = ctx.measureText(text);
    const totalLS  = letterSpacing * dpr * (text.length - 1);
    const totalW   = metrics.width + totalLS;
    let x = w / 2 - totalW / 2;
    for (const ch of text) {
      ctx.fillText(ch, x + ctx.measureText(ch).width / 2, h / 2);
      x += ctx.measureText(ch).width + letterSpacing * dpr;
    }
  }

  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreen);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  return { tex, w, h };
}

// ── Component ─────────────────────────────────────────────────────────────────
interface HeroLensProps {
  h1Ref: React.RefObject<HTMLHeadingElement>;
}

const HeroLens: React.FC<HeroLensProps> = ({ h1Ref }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const h1     = h1Ref.current;
    if (!canvas || !h1) return;

    const dpr = window.devicePixelRatio || 1;
    const gl  = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Build shader (bake tap count)
    const fragSrc = FRAG_TEMPLATE.replace(/##TAPS##/g, String(BLUR_TAPS));
    const prog    = buildProgram(gl, VERT, fragSrc);

    // Fullscreen quad
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes    = gl.getUniformLocation(prog, "u_resolution");
    const uTex    = gl.getUniformLocation(prog, "u_tex");
    const uCenter = gl.getUniformLocation(prog, "u_lensCenter");
    const uRadius = gl.getUniformLocation(prog, "u_radius");
    const uRefr   = gl.getUniformLocation(prog, "u_refraction");
    const uBlur   = gl.getUniformLocation(prog, "u_blurStrength");
    const uFeat   = gl.getUniformLocation(prog, "u_feather");

    gl.useProgram(prog);
    gl.uniform1f(uRefr, REFRACTION);
    gl.uniform1f(uBlur, BLUR_STRENGTH);
    gl.uniform1f(uFeat, EDGE_FEATHER);
    gl.uniform1i(uTex,  0);

    // Texture state
    let tex: WebGLTexture | null = null;

    // Lens position in UV [0,1], current and target
    let lensUV  = { x: 0.5, y: 0.5 };
    let targetUV = { x: 0.5, y: 0.5 };
    let isHovered = false;
    let raf = 0;
    let startTime = 0;

    // Drift phase offset so it starts at centre
    const driftPhase = -Math.PI / 2; // cos(phase)=0 at start → starts at y=centre

    function resize() {
      // Canvas is a child of the same inline-block wrapper as h1,
      // so we just match h1's layout dimensions. top/left = 0 within parent.
      const w = Math.round(h1.offsetWidth  * dpr);
      const h = Math.round(h1.offsetHeight * dpr);
      canvas.width   = w;
      canvas.height  = h;
      canvas.style.width  = `${h1.offsetWidth}px`;
      canvas.style.height = `${h1.offsetHeight}px`;
      canvas.style.top    = "0";
      canvas.style.left   = "0";
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uRadius, RADIUS_FRACTION);

      // Rebuild texture
      if (tex) gl.deleteTexture(tex);
      const t = makeOffscreenTexture(gl, h1, dpr);
      tex = t.tex;
    }

    function draw(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      if (!isHovered) {
        // Autonomous figure-8-ish drift using Lissajous
        const angle = elapsed * DRIFT_SPEED + driftPhase;
        targetUV.x  = 0.5 + Math.cos(angle)           * DRIFT_RADIUS_X;
        targetUV.y  = 0.5 + Math.sin(angle * 1.618)   * DRIFT_RADIUS_Y * 0.55;
      }

      // Lerp current toward target
      lensUV.x += (targetUV.x - lensUV.x) * FOLLOW_LERP;
      lensUV.y += (targetUV.y - lensUV.y) * FOLLOW_LERP;

      if (!tex) { raf = requestAnimationFrame(draw); return; }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform2f(uCenter, lensUV.x, 1.0 - lensUV.y); // flip Y for WebGL
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(draw);
    }

    // Mouse tracking — relative to canvas
    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      targetUV.x = (e.clientX - rect.left) / rect.width;
      targetUV.y = (e.clientY - rect.top)  / rect.height;
    }
    function onMouseEnter() { isHovered = true; }
    function onMouseLeave() { isHovered = false; }

    // Observe font loads then re-texture
    const fontFaceSet = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fontFaceSet) {
      fontFaceSet.ready.then(resize);
    }

    // ResizeObserver on the h1
    const ro = new ResizeObserver(resize);
    ro.observe(h1);
    resize();

    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("mouseleave", onMouseLeave);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      if (tex) gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [h1Ref]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        pointerEvents: "auto",
        zIndex: 10,
        // pixel sizing set dynamically
      }}
      aria-hidden="true"
    />
  );
};

export default HeroLens;
