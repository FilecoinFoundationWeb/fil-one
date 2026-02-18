import { ArrowUpRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section
      className="flex flex-col items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      <div className="flex flex-col gap-8 items-center text-center w-full max-w-[520px]">
        <div className="flex flex-col gap-4 items-center">
          <h2
            className="text-[26px] md:text-[32px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              color: "#09090B",
            }}
          >
            Ready to enter hyperspace?
          </h2>
          <p
            className="text-[14.5px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "1.6",
              color: "#71717A",
              maxWidth: 380,
            }}
          >
            Start with 1 TB free for 14 days. No credit card required.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full justify-center">
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center gap-1 px-5 py-2.5 rounded-full shrink-0 border-2 border-blue-500 bg-transparent text-[#09090B] transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/40 w-full sm:w-auto justify-center"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 14.5,
              textDecoration: "none",
            }}
          >
            Start storing now
            <ArrowUpRight size={13} strokeWidth={2} />
          </a>
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center justify-center px-5 py-2.5 rounded-full transition-colors hover:bg-black/[0.07] shrink-0 w-full sm:w-auto"
            style={{
              backgroundColor: "rgba(0,0,0,0.05)",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 14.5,
              color: "#3F3F46",
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
