import { Brain, Boxes, Film, ShieldCheck, Archive, Blocks } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const USE_CASES = [
  {
    icon: Brain,
    title: "AI & large-scale data",
    description:
      "Store and manage high-volume datasets for AI training, analytics, and data pipelines, optimized for performance, scale, and cost predictability.",
  },
  {
    icon: Boxes,
    title: "Application storage",
    description:
      "Power applications with reliable, S3-compatible object storage, designed to integrate with existing systems and workflows.",
  },
  {
    icon: Film,
    title: "Media & content workflows",
    description:
      "Store and manage large media assets with consistent performance, enabling efficient production, processing, and delivery pipelines.",
  },
  {
    icon: ShieldCheck,
    title: "Backup & disaster recovery",
    description:
      "Protect critical systems with secure, durable storage designed for rapid recovery and long-term resilience.",
  },
  {
    icon: Archive,
    title: "Archival & compliance storage",
    description:
      "Retain long-term data with predictable costs and verifiable durability, supporting compliance and governance requirements.",
  },
  {
    icon: Blocks,
    title: "Web3 & onchain apps",
    description:
      "Build applications on storage that's verifiable, programmable, and aligned with onchain infrastructure.",
  },
];

const UseCasesSection = () => {
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.06 });

  return (
    <section
      id="use-cases"
      className="w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      <div className="flex flex-col gap-12 items-start px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
      {/* Eyebrow */}
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontWeight: 500,
          fontSize: 11.5,
          letterSpacing: "0.08em",
          color: "#A1A1AA",
          textTransform: "uppercase",
        }}
      >
        Use cases
      </span>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group"
      >
        {USE_CASES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className={`flex flex-col gap-5 p-8 rounded-2xl border reveal${cardsInView ? " in-view" : ""}`}
            style={{
              borderColor: "rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
              style={{ backgroundColor: "#EFF8FF" }}
            >
              <Icon size={18} strokeWidth={1.75} color="#0090FF" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: "1.3",
                  color: "#09090B",
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "1.6",
                  color: "#71717A",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
