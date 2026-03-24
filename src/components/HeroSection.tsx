import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import imgDashboard from "../assets/dashboard-preview.png";

const VIDEO_URL = "https://51191454.fs1.hubspotusercontent-na1.net/hubfs/51191454/fil-one-walk-thru.mov";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  return (
    <section
      className="relative w-full overflow-hidden pt-[58px]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Hero content */}
      <div className="relative flex flex-col items-center pt-20 md:pt-[120px] pb-0 px-5 md:px-8 max-w-[1120px] mx-auto w-full">

        <div className="flex flex-col items-center gap-6 w-full hero-fade-1">

          {/* Announcement badge */}
          <a
            href="https://docs.fil.one/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-75"
            style={{
              backgroundColor: "#EFF8FF",
              border: "1px solid rgba(0,144,255,0.2)",
              borderRadius: 9999,
              padding: "4px 4px 4px 10px",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 13.5,
                color: "#0090FF",
                whiteSpace: "nowrap",
              }}
            >
              Explore the documentation
            </span>
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full shrink-0"
              style={{ backgroundColor: "#0090FF" }}
            >
              <ArrowRight size={12} strokeWidth={2.5} color="#FFFFFF" />
            </div>
          </a>

          {/* Headline */}
          <h1
            className="text-[36px] sm:text-[44px] md:text-[56px]"
            style={{
              fontFamily: "'Aspekta', sans-serif",
              fontWeight: 500,
              lineHeight: "1.12",
              letterSpacing: "-0.02em",
              color: "#09090B",
              textAlign: "center",
              maxWidth: 600,
              margin: 0,
            }}
          >
            S3 object storage built for the AI era
          </h1>

          {/* Subheadline */}
          <p
            className="text-[15px] md:text-[16.5px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "1.65",
              color: "#71717A",
              textAlign: "center",
              maxWidth: 580,
              margin: 0,
            }}
          >
            Store and manage large-scale datasets with S3-compatible APIs, built for enterprise reliability and predictable costs.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 hero-fade-2">
          <a href="https://app.fil.one/" className="btn-primary">
            <span className="btn-primary-inner">Try 30 days for free</span>
          </a>
          <a href="/contact-sales" className="btn-secondary">
            Talk to an expert
          </a>
        </div>

        {/* Tagline */}
        <p
          className="mt-4 hero-fade-3"
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            lineHeight: "1.5",
            color: "#A1A1AA",
            textAlign: "center",
          }}
        >
          1 TB included · No credit card required
        </p>
      </div>

      {/* Dashboard preview / video */}
      <div className="relative px-5 sm:px-10 md:px-16 lg:px-[120px] pb-0 pt-12 md:pt-16 max-w-[1120px] mx-auto w-full hero-fade-4">
        <div
          className="relative w-full rounded-t-[12px] md:rounded-t-[16px] overflow-hidden"
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderBottom: "none",
            aspectRatio: "1506 / 799",
            boxShadow: "0 -4px 40px rgba(0,0,0,0.06)",
            backgroundColor: playing ? "#000" : "transparent",
          }}
        >
          {/* Poster image — hidden once playing */}
          {!playing && (
            <>
              <img
                src={imgDashboard}
                alt="Fil One S3-compatible object storage dashboard — bucket management, API keys, and usage metrics"
                className="absolute inset-0 w-full h-full object-fill"
              />
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0) 55%, #FFFFFF 100%)",
                }}
              />
              {/* Play button */}
              <button
                onClick={handlePlay}
                className="absolute inset-0 z-20 flex items-center justify-center w-full h-full"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
                aria-label="Play walkthrough video"
              >
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
                    transition: "transform 150ms ease, background-color 150ms ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.08)"; (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.92)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.75)"; }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4.5L18 11L7 17.5V4.5Z" fill="#09090B" />
                  </svg>
                </div>
              </button>
            </>
          )}

          {/* Video — rendered once play is clicked */}
          {playing && (
            <video
              ref={videoRef}
              src={VIDEO_URL}
              controls
              playsInline
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "fill" }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
