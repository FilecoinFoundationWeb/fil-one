import { ArrowUpRight } from "lucide-react";
import ctaBg from "../assets/enter-hyperspace-cta-background.png";

const CtaSection = () => {
  return (
    <section
      className="flex flex-col items-center px-5 md:px-8 py-16 md:py-20 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Dark card */}
      <div
        className="flex flex-col gap-8 items-center justify-center text-center w-full max-w-[1120px] px-8 py-20 md:py-32"
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 28,
          minHeight: 320,
        }}
      >
        <div className="flex flex-col gap-4 items-center max-w-[520px]">
          <h2
            className="text-[26px] md:text-[32px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
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
            Start with 1 TB free for 30 days. No credit card required.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center">
          <a href="https://fil-hyperspace.vercel.app/" className="btn-primary btn-primary-dark w-full sm:w-auto">
            <span className="btn-primary-inner w-full justify-center sm:w-auto">
              Start storing now
              <ArrowUpRight size={13} strokeWidth={2} className="btn-arrow" />
            </span>
          </a>
          <a href="https://fil-hyperspace.vercel.app/" className="btn-secondary btn-secondary-dark w-full sm:w-auto justify-center">
            Talk to an expert
            <ArrowUpRight size={13} strokeWidth={2} className="btn-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
