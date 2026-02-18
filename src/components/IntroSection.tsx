const IntroSection = () => {
  return (
    <section
      className="flex flex-col items-center justify-center px-[200px] py-[120px] w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col gap-10 items-center text-center w-[680px]">
        <h2
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            fontSize: 36,
            lineHeight: "1.3",
            color: "#09090B",
          }}
        >
          Fil Hyperspace is S3-compatible object storage built for large-scale data.
        </h2>
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "1.4",
            color: "#3F3F46",
            maxWidth: 554,
          }}
        >
          Use your existing S3 tools to store and manage large datasets with predictable pricing, strong durability, and no infrastructure changes.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
