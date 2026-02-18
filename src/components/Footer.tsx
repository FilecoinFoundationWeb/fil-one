const Footer = () => {
  const links: Record<string, string[]> = {
    Navigation: ["About", "Features", "Pricing"],
    Resources: ["Documentation", "Status", "Contact", "Filecoin"],
    Legal: ["Privacy Policy", "Terms of Service", "Security"],
  };

  return (
    <footer
      className="flex items-start justify-between overflow-hidden p-20 w-full border-t"
      style={{ borderColor: "rgba(0,0,0,0.08)", backgroundColor: "#FFFFFF" }}
    >
      {/* Left: logo + tagline + copyright */}
      <div className="flex flex-col items-start justify-between self-stretch w-60">
        <div className="flex flex-col gap-6 items-start w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-[4.8px] shrink-0"
              style={{ backgroundColor: "#09090B" }}
            />
            <span
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "#09090B",
              }}
            >
              Fil Hyperspace
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "1.5",
              color: "#71717B",
            }}
          >
            The hyperscale data storage layer for the AI era.
          </p>
        </div>

        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: "1.5",
            color: "#A1A1AA",
          }}
        >
          2026 Fil Hyperspace. All rights reserved.
        </p>
      </div>

      {/* Right: link groups */}
      <div className="flex gap-20 items-start">
        {Object.entries(links).map(([title, items]) => (
          <div key={title} className="flex flex-col gap-4 items-start">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "1.4",
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
                  fontSize: 16,
                  lineHeight: "1.4",
                  color: "#71717B",
                  textDecoration: "none",
                }}
                className="hover:text-[#09090B] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
