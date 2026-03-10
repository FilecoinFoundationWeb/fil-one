import { useRef } from "react";
import imgDashboard from "../assets/dashboard-preview.png";
import HeroLens from "./HeroLens";
import WaitlistInput from "./WaitlistInput";

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
              className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px]"
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
              S3-compatible object storage
            </h1>
            <HeroLens h1Ref={h1Ref} bg="#FFFFFF" />
          </div>

          <p
            className="text-base md:text-[18px]"
            style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.6", color: "#71717A", textAlign: "center", maxWidth: 620 }}
          >
            Store large datasets using familiar S3-compatible APIs while unlocking lower-cost storage and verifiable durability.
          </p>
        </div>

        {/* CTA — waitlist */}
        <div className="w-full flex justify-center mt-8 hero-fade-2" style={{ maxWidth: 400 }}>
          <WaitlistInput className="w-full" />
        </div>

        {/* Tagline */}
        <p
          className="mt-5 hero-fade-3"
          style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "1.5", color: "#A1A1AA", textAlign: "center", maxWidth: 520 }}
        >
          30 days free · 1 TB included · No credit card required
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="relative px-5 sm:px-10 md:px-16 lg:px-[120px] pb-0 pt-12 md:pt-16 max-w-[1120px] mx-auto w-full hero-fade-4">
        <div
          className="relative w-full rounded-t-[12px] md:rounded-t-[16px] overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.08)", borderBottom: "none", aspectRatio: "1506 / 799", boxShadow: "0 -4px 40px rgba(0,0,0,0.06)" }}
        >
          <img src={imgDashboard} alt="FilOne Dashboard" className="absolute inset-0 w-full h-full object-fill" />
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 55%, #FFFFFF 100%)" }} />
          {/* Play button */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 4.5L18 11L7 17.5V4.5Z" fill="#09090B" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
