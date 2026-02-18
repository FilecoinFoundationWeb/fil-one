import { ArrowUpRight } from "lucide-react";

const imgDashboard = "http://localhost:3845/assets/ac6924f45b365f9df0cfc55cd894cdddc08badaf.png";

const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Background glow ring */}
      <div
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
        style={{ top: "-160px" }}
      >
        <div
          style={{
            width: 900,
            height: 400,
            background:
              "radial-gradient(ellipse at center, rgba(0,144,255,0.08) 0%, rgba(0,144,255,0.03) 40%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative flex flex-col items-center gap-[52px] pt-[200px] pb-0 px-[60px]">
        {/* Text block */}
        <div className="flex flex-col items-center gap-6 w-full">
          <h1
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 96,
              lineHeight: "96px",
              letterSpacing: "-0.96px",
              color: "#09090B",
              textAlign: "center",
            }}
          >
            Hyperspace
          </h1>
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 30,
              lineHeight: "40px",
              color: "#3F3F46",
              textAlign: "center",
              maxWidth: 364,
            }}
          >
            S3-compatible storage powered by Filecoin
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center gap-1 px-6 py-4 rounded-full overflow-hidden hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#0090FF",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            Try 14 days for free
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center gap-2 px-6 py-4 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "#E4E4E7",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              color: "#09090B",
              textDecoration: "none",
            }}
          >
            Read the docs
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "1.4",
            color: "#71717B",
            textAlign: "center",
            maxWidth: 554,
          }}
        >
          Lower costs, verifiable durability, and zero infrastructure changes.
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="relative px-[200px] pb-[120px] pt-16">
        <div
          className="relative w-full rounded-tl-[24px] rounded-tr-[24px] overflow-hidden"
          style={{
            border: "1px solid rgba(0,0,0,0.1)",
            borderBottom: "none",
            height: 600,
          }}
        >
          {/* Top gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 40%)",
              borderRadius: "24px 24px 0 0",
            }}
          />
          <img
            src={imgDashboard}
            alt="Hyperspace Dashboard"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ borderRadius: "24px 24px 0 0" }}
          />
          {/* Bottom gradient fade */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 50%, #FFFFFF 100%)",
              borderRadius: "24px 24px 0 0",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
