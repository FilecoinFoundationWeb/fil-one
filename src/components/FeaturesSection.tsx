import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const BASE_FEATURES = [
  {
    title: "S3-compatible buckets",
    desc: "Use existing tools and workflows without modification.",
  },
  {
    title: "API key management",
    desc: "Generate, rotate, and revoke keys with fine-grained access control.",
  },
  {
    title: "Hyperscale storage economics",
    desc: "Optimized for large datasets and long-term retention.",
  },
  {
    title: "Verifiable durability",
    desc: "Cryptographic proofs ensure data is actually stored.",
  },
  {
    title: "Enterprise-ready",
    desc: "Built for reliability, auditability, and predictable costs.",
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

  const goLeft = () => {
    if (jumping.current) return;
    const next = index - 1;
    setTransitioning(true);
    setIndex(next);
    if (next < N) jump(next, next + N);
  };

  const goRight = () => {
    if (jumping.current) return;
    const next = index + 1;
    setTransitioning(true);
    setIndex(next);
    if (next >= N * 2) jump(next, next - N);
  };

  const logicalActive = index % N;

  return (
    <section
      id="features"
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
    <div className="flex flex-col gap-8 md:gap-10 items-start px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
      {/* Section label */}
      <p
        ref={headerRef}
        className={`reveal${inView ? " in-view" : ""}`}
        style={{
          fontFamily: "'DM Mono', monospace",
          fontWeight: 500,
          fontSize: 11.5,
          letterSpacing: "0.08em",
          color: "#A1A1AA",
          textTransform: "uppercase",
        }}
      >
        Features
      </p>

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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#F4F4F5",
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="8" fill="#E4E4E7"/>
                    <path d="M14 34L20 26L25 31L30 23L34 34H14Z" fill="#D1D5DB"/>
                    <circle cx="19" cy="20" r="3" fill="#D1D5DB"/>
                  </svg>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: "1.4",
                      letterSpacing: "-0.01em",
                      color: "#09090B",
                    }}
                  >
                    {f.title}
                  </p>
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
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", border: "none", cursor: "pointer" }}
        >
          <ChevronLeft size={18} color="#09090B" strokeWidth={2} />
        </button>
        <button
          onClick={goRight}
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
