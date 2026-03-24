import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import img1 from "../assets/features-1-s3buckets.png";
import img2 from "../assets/features-2-apikey.png";
import img3 from "../assets/features-3-hyperscalestorage.png";
import img4 from "../assets/features-4-verifiabledurability.png";
import img5 from "../assets/features-5-enterpriseready.png";
import img6 from "../assets/features-6-versioncontrol.png";

const BASE_FEATURES = [
  {
    title: "Enterprise-grade service",
    desc: "Built for long-term data retention with reliable performance and predictable storage economics.",
    img: img5,
    imgAlt: "Fil One enterprise-grade S3 object storage dashboard showing SLA and uptime metrics",
  },
  {
    title: "S3-compatibility",
    desc: "Create and manage storage buckets using the standard S3 API. Integrate with existing tools, SDKs, and workflows without changing your infrastructure.",
    img: img1,
    imgAlt: "Fil One S3-compatible bucket management interface",
  },
  {
    title: "API key management",
    desc: "Generate, rotate, and revoke credentials to securely control access to your storage.",
    img: img2,
    imgAlt: "Fil One API key management panel for creating and revoking storage credentials",
  },
  {
    title: "Built for large datasets",
    desc: "Designed to store and manage large datasets and archives with predictable performance and storage costs.",
    img: img3,
    imgAlt: "Fil One hyperscale object storage for large datasets and AI workloads",
  },
  {
    title: "Durable storage",
    desc: "SLA-backed data durability with 24/7 visibility into storage integrity.",
    img: img4,
    imgAlt: "Fil One verifiable data durability dashboard showing storage integrity metrics on Filecoin",
  },
  {
    title: "Version control",
    desc: "100% recoverable data state at any point in change history.",
    img: img6,
    imgAlt: "Fil One version control interface showing object change history and data recovery",
  },
];

const N = BASE_FEATURES.length;
const GAP = 16;
// Triple: [clone | original | clone]
const features = [...BASE_FEATURES, ...BASE_FEATURES, ...BASE_FEATURES];

const FeaturesSection = () => {
  const { ref: headerRef, inView } = useInView({ threshold: 0.08 });
  const [index, setIndex] = useState(N); // start in the middle copy
  const [transitioning, setTransitioning] = useState(true);
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const jumping = useRef(false);

  // Measure item width on mount and resize
  useEffect(() => {
    const measure = () => {
      if (itemRef.current) setItemWidth(itemRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const translateX = -(index * (itemWidth + GAP));

  const jump = useCallback((from: number, to: number) => {
    if (jumping.current) return;
    jumping.current = true;
    setTimeout(() => {
      setTransitioning(false);
      setIndex(to);
      // Re-enable transition after the silent jump renders
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitioning(true);
          jumping.current = false;
        });
      });
    }, 480);
  }, []);

  const goLeft = useCallback(() => {
    if (jumping.current) return;
    setTransitioning(true);
    setIndex((prev) => {
      const next = prev - 1;
      if (next < N) jump(next, next + N);
      return next;
    });
  }, [jump]);

  const goRight = useCallback(() => {
    if (jumping.current) return;
    setTransitioning(true);
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= N * 2) jump(next, next - N);
      return next;
    });
  }, [jump]);

  const logicalActive = index % N;

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); goLeft();  }
      if (e.key === "ArrowRight") { e.preventDefault(); goRight(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goLeft, goRight]);

  return (
    <section
      id="features"
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
    <div className="flex flex-col gap-8 md:gap-10 items-start px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
      {/* Section label — decorative eyebrow */}
      <span
        ref={headerRef}
        aria-hidden="true"
        className={`reveal${inView ? " in-view" : ""}`}
        style={{
          display: "block",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 500,
          fontSize: 11.5,
          letterSpacing: "0.08em",
          color: "#A1A1AA",
          textTransform: "uppercase",
        }}
      >
        Features
      </span>

      {/* Sliding track */}
      <div
        className={`w-full overflow-hidden reveal${inView ? " in-view" : ""}`}
        style={{
          WebkitMaskImage: "linear-gradient(to right, black calc(100% - 80px), transparent 100%)",
          maskImage: "linear-gradient(to right, black calc(100% - 80px), transparent 100%)",
          transitionDelay: inView ? "80ms" : "0ms",
        }}
      >
        <div
          className="flex items-start"
          style={{
            gap: GAP,
            transform: `translateX(${translateX}px)`,
            transition: transitioning ? "transform 480ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            willChange: "transform",
          }}
        >
          {features.map((f, i) => {
            const isActive = i % N === logicalActive;
            const stepsAway = i - index;
            return (
              <div
                key={`${f.title}-${i}`}
                ref={i === N ? itemRef : undefined}
                className="flex flex-col shrink-0"
                onClick={() => {
                  if (!isActive && !jumping.current) {
                    if (stepsAway > 0) for (let s = 0; s < stepsAway; s++) goRight();
                    else for (let s = 0; s < -stepsAway; s++) goLeft();
                  }
                }}
                style={{
                  width: "clamp(260px, 55vw, 360px)",
                  gap: 16,
                  opacity: isActive ? 1 : 0.25,
                  transition: "opacity 400ms ease, transform 480ms cubic-bezier(0.4,0,0.2,1)",
                  transform: isActive ? "scale(1)" : "scale(0.975)",
                  transformOrigin: "left top",
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                {/* Card image */}
                <div
                  style={{
                    width: "100%",
                    height: "clamp(148px, 18vw, 240px)",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.07)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={f.img}
                    alt={f.imgAlt}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <h3
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: "1.4",
                      letterSpacing: "-0.01em",
                      color: "#09090B",
                      margin: 0,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: "1.6",
                      color: "#71717A",
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className={`flex gap-2 reveal${inView ? " in-view" : ""}`} style={{ transitionDelay: inView ? "160ms" : "0ms" }}>
        <button
          onClick={goLeft}
          aria-label="Previous feature"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", border: "none", cursor: "pointer" }}
        >
          <ChevronLeft size={18} color="#09090B" strokeWidth={2} />
        </button>
        <button
          onClick={goRight}
          aria-label="Next feature"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", border: "none", cursor: "pointer" }}
        >
          <ChevronRight size={18} color="#09090B" strokeWidth={2} />
        </button>
      </div>
    </div>
    </section>
  );
};

export default FeaturesSection;
