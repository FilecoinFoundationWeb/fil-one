const Footer = () => {
  const links: Record<string, string[]> = {
    Navigation: ["Features", "Compare", "FAQ"],
    Resources: ["Contact", "Filecoin"],
    Legal: ["Privacy Policy", "Terms of Service"],
  };

  return (
    <footer
      className="flex flex-col px-5 md:px-8 pt-14 pb-10 w-full border-t"
      style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col gap-12 w-full max-w-[1120px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          {/* Left: logo + tagline */}
          <div className="flex flex-col gap-3 items-start max-w-[220px]">
            <div className="flex items-center gap-2">
              <img src="https://filecoin.io/images/filecoin-logo.svg" alt="Filecoin" className="w-[22px] h-[22px] shrink-0" />
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "-0.01em",
                  color: "#09090B",
                }}
              >
                FilOne
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                lineHeight: "1.6",
                color: "#A1A1AA",
              }}
            >
              S3-compatible object storage powered by Filecoin.
            </p>
          </div>

          {/* Right: link groups */}
          <div className="grid grid-cols-3 gap-8 md:flex md:flex-row md:gap-16 items-start">
            {Object.entries(links).map(([title, items]) => (
              <div key={title} className="flex flex-col gap-3 items-start">
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 12.5,
                    letterSpacing: "0.02em",
                    color: "#09090B",
                  }}
                >
                  {title}
                </p>
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: "1.4",
                      color: "#A1A1AA",
                      textDecoration: "none",
                    }}
                    className="hover:text-[#52525B] transition-colors duration-150"
                  >
                    {item}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: divider + copyright */}
        <div className="flex flex-col gap-4 border-t pt-6" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              color: "#D4D4D8",
            }}
          >
            © 2026 FilOne. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
