import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imgDashboard = "http://localhost:3845/assets/ac6924f45b365f9df0cfc55cd894cdddc08badaf.png";

const features = [
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

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goLeft = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goRight = () => setActiveIndex((i) => Math.min(features.length - 1, i + 1));

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

      {/* Image cards */}
      <div className="flex gap-3 items-start w-full overflow-x-auto pb-1 md:overflow-visible">
        {features.map((f, i) => (
          <button
            key={f.title}
            onClick={() => setActiveIndex(i)}
            className="shrink-0 transition-all duration-300"
            style={{
              width: "clamp(240px, 62vw, 480px)",
              height: "clamp(148px, 20vw, 260px)",
              opacity: i === activeIndex ? 1 : 0.18,
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: 12,
              padding: 0,
              cursor: "pointer",
              backgroundColor: "#F4F4F5",
            }}
          >
            <img
              src={imgDashboard}
              alt={f.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Feature text */}
      <div className="w-full">
        {/* Mobile: show only active feature */}
        <div className="md:hidden flex flex-col gap-1.5">
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "1.35",
              letterSpacing: "-0.01em",
              color: "#09090B",
            }}
          >
            {features[activeIndex].title}
          </p>
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 14.5,
              lineHeight: "1.6",
              color: "#71717A",
            }}
          >
            {features[activeIndex].desc}
          </p>
        </div>

        {/* Desktop: all labels */}
        <div className="hidden md:flex gap-16 items-start">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="flex flex-col gap-1.5 items-start flex-1 transition-opacity duration-300 cursor-pointer"
              style={{ opacity: i === activeIndex ? 1 : 0.3 }}
              onClick={() => setActiveIndex(i)}
            >
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
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 items-center justify-between md:justify-end w-full">
        {/* Dot indicators on mobile */}
        <div className="flex gap-1.5 md:hidden">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === activeIndex ? 18 : 6,
                height: 6,
                backgroundColor: i === activeIndex ? "#09090B" : "#D4D4D8",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={goLeft}
            disabled={activeIndex === 0}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
              border: "none",
              cursor: activeIndex === 0 ? "not-allowed" : "pointer",
              opacity: activeIndex === 0 ? 0.3 : 1,
            }}
          >
            <ChevronLeft size={18} color="#09090B" strokeWidth={2} />
          </button>
          <button
            onClick={goRight}
            disabled={activeIndex === features.length - 1}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
              border: "none",
              cursor: activeIndex === features.length - 1 ? "not-allowed" : "pointer",
              opacity: activeIndex === features.length - 1 ? 0.3 : 1,
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
