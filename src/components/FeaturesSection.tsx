import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imgDashboard = "http://localhost:3845/assets/ac6924f45b365f9df0cfc55cd894cdddc08badaf.png";

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

// Triple the array: [clone, original, clone]
const features = [...BASE_FEATURES, ...BASE_FEATURES, ...BASE_FEATURES];

const FeaturesSection = () => {
  // Start in the middle copy
  const [activeIndex, setActiveIndex] = useState(N);
  const [animated, setAnimated] = useState(true);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const recalc = (idx: number) => {
    const active = colRefs.current[idx];
    if (!active) return;
    setOffset(active.offsetLeft);
  };

  useEffect(() => {
    recalc(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    window.addEventListener("resize", () => recalc(activeIndex));
    return () => window.removeEventListener("resize", () => recalc(activeIndex));
  }, [activeIndex]);

  const goLeft = () => {
    const next = activeIndex - 1;
    setAnimated(true);
    setActiveIndex(next);

    // If we've reached the first clone, silently jump to the real last item
    if (next < N) {
      setTimeout(() => {
        setAnimated(false);
        const jumpTo = next + N;
        setActiveIndex(jumpTo);
        // Force offset recalc without animation
        const active = colRefs.current[jumpTo];
        if (active) setOffset(active.offsetLeft);
      }, 520);
    }
  };

  const goRight = () => {
    const next = activeIndex + 1;
    setAnimated(true);
    setActiveIndex(next);

    // If we've reached the last clone, silently jump to the real first item
    if (next >= N * 2) {
      setTimeout(() => {
        setAnimated(false);
        const jumpTo = next - N;
        setActiveIndex(jumpTo);
        const active = colRefs.current[jumpTo];
        if (active) setOffset(active.offsetLeft);
      }, 520);
    }
  };

  const select = (i: number) => {
    setAnimated(true);
    setActiveIndex(i);
  };

  // The "logical" active index for styling (mod N)
  const logicalActive = activeIndex % N;

  return (
    <section
      id="features"
      className="flex flex-col gap-8 md:gap-10 items-start px-5 md:px-8 py-24 md:py-32 w-full overflow-hidden max-w-[1120px] mx-auto"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Section label */}
      <p
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
        className="w-full overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, black calc(100% - 80px), transparent 100%)",
          maskImage: "linear-gradient(to right, black calc(100% - 80px), transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="flex items-start"
          style={{
            gap: GAP,
            transform: `translateX(-${offset}px)`,
            transition: animated ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            willChange: "transform",
          }}
        >
          {features.map((f, i) => {
            const isActive = i % N === logicalActive && Math.abs(i - activeIndex) < N;
            const isRealActive = i === activeIndex;
            return (
              <div
                key={`${f.title}-${i}`}
                ref={(el) => { colRefs.current[i] = el; }}
                className="flex flex-col shrink-0 cursor-pointer"
                style={{
                  width: "clamp(260px, 55vw, 360px)",
                  gap: 16,
                  opacity: isRealActive ? 1 : isActive ? 1 : 0.25,
                  transition: "opacity 400ms ease, transform 500ms cubic-bezier(0.4,0,0.2,1)",
                  transform: (isRealActive || isActive) ? "scale(1)" : "scale(0.975)",
                  transformOrigin: "left top",
                }}
                onClick={() => select(i)}
              >
                {/* Card image */}
                <div
                  style={{
                    width: "100%",
                    height: "clamp(148px, 18vw, 240px)",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#F4F4F5",
                  }}
                >
                  <img
                    src={imgDashboard}
                    alt={f.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Text label */}
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
      <div className="flex gap-3 items-center w-full">
        <div className="flex gap-2">
          <button
            onClick={goLeft}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={18} color="#09090B" strokeWidth={2} />
          </button>
          <button
            onClick={goRight}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={18} color="#09090B" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
