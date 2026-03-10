import ctaBg from "../assets/enter-hyperspace-cta-background.png";
import { useInView } from "@/hooks/useInView";

const CtaSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section
      className="flex flex-col items-center px-5 md:px-8 py-16 md:py-20 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Dark card */}
      <div
        ref={ref}
        className={`flex flex-col gap-8 items-center justify-center text-center w-full max-w-[1120px] px-8 py-20 md:py-32 reveal${inView ? " in-view" : ""}`}
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
            Start storing smarter today.
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
            Talk to our team about pricing, enterprise plans, or integrating FilOne into your stack.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center">
          <a href="mailto:hello@filhyperspace.io" className="btn-secondary btn-secondary-dark w-full sm:w-auto justify-center">
            Contact sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
