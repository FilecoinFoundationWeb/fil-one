import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import imgDashboard from "../assets/dashboard-preview.png";
import HeroLens from "./HeroLens";

const HeroSection = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  return (
    <section
      className="relative w-full overflow-hidden pt-[58px]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Hero content */}
      <div className="relative flex flex-col items-center pt-20 md:pt-[140px] pb-0 px-5 md:px-8 max-w-[1120px] mx-auto w-full">

        <div className="flex flex-col items-center gap-4 w-full hero-fade-1">
          {/* Relative wrapper so the canvas can be positioned over the h1 */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <h1
              ref={h1Ref}
              className="text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px]"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                lineHeight: "1.0",
                letterSpacing: "-0.04em",
                color: "#09090B",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              Hyperspace
            </h1>
            <HeroLens h1Ref={h1Ref} bg="#FFFFFF" />
          </div>

          <p
            className="text-base md:text-[18px]"
            style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.6", color: "#71717A", textAlign: "center", maxWidth: 360 }}
          >
            S3-compatible storage powered by Filecoin
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full mt-8 hero-fade-2">
          <a href="https://fil-hyperspace.vercel.app/" className="btn-primary w-full sm:w-auto">
            <span className="btn-primary-inner">
              Try 30 days for free
              <ArrowUpRight size={13} strokeWidth={2} className="btn-arrow" />
            </span>
          </a>
          <a href="https://fil-hyperspace.vercel.app/" className="btn-secondary w-full sm:w-auto justify-center">
            Read the docs
            <ArrowUpRight size={13} strokeWidth={2} className="btn-arrow" />
          </a>
        </div>

        {/* Tagline */}
        <p
          className="mt-5 hero-fade-3"
          style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "1.5", color: "#A1A1AA", textAlign: "center", maxWidth: 520 }}
        >
          Lower costs, verifiable durability, and zero infrastructure changes.
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="relative px-5 sm:px-10 md:px-16 lg:px-[120px] pb-0 pt-12 md:pt-16 max-w-[1120px] mx-auto w-full hero-fade-4">
        <div
          className="relative w-full rounded-t-[12px] md:rounded-t-[16px] overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.08)", borderBottom: "none", aspectRatio: "1506 / 799", boxShadow: "0 -4px 40px rgba(0,0,0,0.06)" }}
        >
          <img src={imgDashboard} alt="Hyperspace Dashboard" className="absolute inset-0 w-full h-full object-fill" />
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 55%, #FFFFFF 100%)" }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
