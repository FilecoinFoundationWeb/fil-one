const IntroSection = () => {
  return (
    <section
      className="flex flex-col items-center justify-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col gap-6 items-center text-center w-full max-w-[640px]">
        <h2
          className="text-2xl sm:text-[28px] md:text-[32px]"
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            lineHeight: "1.25",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          Fil Hyperspace is S3-compatible object storage built for large-scale data.
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
          Use your existing S3 tools to store and manage large datasets with predictable pricing, strong durability, and no infrastructure changes.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
