import { ArrowUpRight } from "lucide-react";

const imgDashboard = "http://localhost:3845/assets/ac6924f45b365f9df0cfc55cd894cdddc08badaf.png";

const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden pt-[58px]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center" style={{ top: "-80px" }}>
        <div
          style={{
            width: 800,
            height: 500,
            background: "radial-gradient(ellipse at center, rgba(0,144,255,0.07) 0%, rgba(0,144,255,0.02) 50%, transparent 75%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative flex flex-col items-center gap-6 md:gap-8 pt-20 md:pt-[140px] pb-0 px-5 md:px-8 max-w-[1120px] mx-auto w-full">
        {/* Label */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
          style={{ borderColor: "rgba(0,144,255,0.2)", backgroundColor: "rgba(0,144,255,0.04)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#0090FF" }} />
          <span
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 12.5,
              color: "#0090FF",
              letterSpacing: "0.01em",
            }}
          >
            Now in public beta
          </span>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-4 md:gap-5 w-full">
          <h1
            className="text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              lineHeight: "1.0",
              letterSpacing: "-0.04em",
              color: "#09090B",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            Hyperspace
          </h1>
          <p
            className="text-lg md:text-[22px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "1.55",
              color: "#71717A",
              textAlign: "center",
              maxWidth: 420,
            }}
          >
            S3-compatible storage powered by Filecoin
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full">
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center gap-1 px-5 py-2.5 rounded-full w-full sm:w-auto justify-center border-2 border-blue-500 bg-transparent text-[#09090B] transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/40"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 14.5,
              textDecoration: "none",
            }}
          >
            Try 14 days for free
            <ArrowUpRight size={13} strokeWidth={2} />
          </a>
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center gap-1 px-5 py-2.5 rounded-full hover:bg-black/[0.07] transition-colors w-full sm:w-auto justify-center"
            style={{
              backgroundColor: "rgba(0,0,0,0.05)",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 14.5,
              color: "#3F3F46",
              textDecoration: "none",
            }}
          >
            Read the docs
            <ArrowUpRight size={13} strokeWidth={2} />
          </a>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 13.5,
            lineHeight: "1.5",
            color: "#A1A1AA",
            textAlign: "center",
            maxWidth: 420,
          }}
        >
          Lower costs, verifiable durability, and zero infrastructure changes.
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="relative px-5 sm:px-10 md:px-16 lg:px-[120px] pb-0 pt-12 md:pt-16 max-w-[1120px] mx-auto w-full">
        <div
          className="relative w-full rounded-t-[12px] md:rounded-t-[16px] overflow-hidden"
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderBottom: "none",
            height: "clamp(220px, 38vw, 560px)",
            boxShadow: "0 -4px 40px rgba(0,0,0,0.06)",
          }}
        >
          <img
            src={imgDashboard}
            alt="Hyperspace Dashboard"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 55%, #FFFFFF 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
