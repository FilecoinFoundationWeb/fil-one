import { useInView } from "@/hooks/useInView";

const IntroSection = () => {
  const { ref, inView } = useInView();

  return (
    <section
      className="flex flex-col items-center justify-center px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div ref={ref} className={`flex flex-col gap-6 items-center text-center w-full max-w-[640px] reveal${inView ? " in-view" : ""}`}>
        <h2
          className="text-2xl sm:text-[28px] md:text-[32px]"
          style={{
            fontFamily: "'Aspekta', sans-serif",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          Fil One is S3-compatible object storage built for data at scale.
        </h2>
        <p
          className="text-[15px] md:text-base"
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            lineHeight: "1.65",
            color: "#71717A",
            maxWidth: 520,
          }}
        >
          Use the tools you already know to store and manage large datasets — with predictable pricing, durable storage, and infrastructure designed to avoid hyperscaler lock-in.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
