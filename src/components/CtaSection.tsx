import { ArrowUpRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section
      className="flex flex-col items-center pb-[240px] pt-[120px] px-20 w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      <div className="flex flex-col gap-10 items-start w-[616px]">
        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            fontSize: 36,
            lineHeight: "1.3",
            letterSpacing: "-0.36px",
            color: "#09090B",
            textAlign: "center",
            width: "100%",
          }}
        >
          Ready to enter hyperspace?
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "1.5",
            color: "#3F3F46",
            textAlign: "center",
            width: "100%",
          }}
        >
          Start with 1 TB free for 14 days. No credit card required.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-6 w-full">
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center gap-1 px-6 py-4 rounded-full overflow-hidden hover:opacity-90 transition-opacity shrink-0"
            style={{
              backgroundColor: "#0090FF",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "1.4",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            Start storing now
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center justify-center px-6 py-4 rounded-full overflow-hidden hover:opacity-80 transition-opacity shrink-0"
            style={{
              backgroundColor: "#E4E4E7",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "1.4",
              color: "#09090B",
              textDecoration: "none",
            }}
          >
            Talk to an expert
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
