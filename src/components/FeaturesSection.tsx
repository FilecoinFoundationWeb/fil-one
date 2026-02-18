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
      className="flex flex-col gap-10 items-start px-20 py-[120px] w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Image cards */}
      <div className="flex gap-4 items-start w-full">
        {features.map((f, i) => (
          <button
            key={f.title}
            onClick={() => setActiveIndex(i)}
            className="rounded-[20px] shrink-0 transition-opacity duration-300"
            style={{
              width: 520,
              height: 280,
              opacity: i === activeIndex ? 1 : 0.2,
              position: "relative",
              overflow: "hidden",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(0,0,0,0.05)",
                borderRadius: 20,
              }}
            />
            <img
              src={imgDashboard}
              alt={f.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ borderRadius: 20 }}
            />
          </button>
        ))}
      </div>

      {/* Feature text labels */}
      <div className="flex gap-20 items-start">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="flex flex-col gap-2 items-start w-[260px] transition-opacity duration-300"
            style={{ opacity: i === activeIndex ? 1 : 0.4 }}
          >
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 24,
                lineHeight: "1.5",
                color: "#09090B",
              }}
            >
              {f.title}
            </p>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "1.5",
                color: "#71717B",
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex gap-4 items-center justify-end w-full">
        <button
          onClick={goLeft}
          disabled={activeIndex === 0}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-opacity"
          style={{
            backgroundColor: "rgba(0,0,0,0.08)",
            border: "none",
            cursor: activeIndex === 0 ? "not-allowed" : "pointer",
            opacity: activeIndex === 0 ? 0.4 : 1,
          }}
        >
          <ChevronLeft size={24} color="#09090B" />
        </button>
        <button
          onClick={goRight}
          disabled={activeIndex === features.length - 1}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-opacity"
          style={{
            backgroundColor: "rgba(0,0,0,0.08)",
            border: "none",
            cursor: activeIndex === features.length - 1 ? "not-allowed" : "pointer",
            opacity: activeIndex === features.length - 1 ? 0.4 : 1,
          }}
        >
          <ChevronRight size={24} color="#09090B" />
        </button>
      </div>
    </section>
  );
};

export default FeaturesSection;
