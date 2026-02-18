import { ArrowUpRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className="flex items-center justify-between px-9 py-9 w-full border-b"
      style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(0,0,0,0.08)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-4 shrink-0">
        <div
          className="w-10 h-10 rounded-[6px] shrink-0"
          style={{ backgroundColor: "#09090B" }}
        />
        <span
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 600,
            fontSize: 20,
            color: "#09090B",
          }}
        >
          Fil Hyperspace
        </span>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-6">
        {[
          { label: "Features", weight: 600 },
          { label: "Pricing", weight: 500 },
          { label: "Compare", weight: 600 },
        ].map(({ label, weight }) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="px-[10px] py-[6px] rounded-[4px] transition-colors hover:bg-black/5"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: weight,
              fontSize: 16,
              color: "#09090B",
              textDecoration: "none",
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6 shrink-0">
        <a
          href="#"
          className="flex items-center gap-1 px-[10px] py-[6px] rounded-[4px] hover:bg-black/5 transition-colors"
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            fontSize: 16,
            color: "#09090B",
            textDecoration: "none",
          }}
        >
          Docs
          <ArrowUpRight size={14} />
        </a>
        <a
          href="https://docs.filecoin.cloud/getting-started/"
          className="flex items-center gap-1 px-6 py-4 rounded-full border-2 overflow-hidden hover:opacity-90 transition-opacity"
          style={{
            borderColor: "#0090FF",
            backgroundColor: "#0090FF",
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            fontSize: 16,
            color: "#FFFFFF",
            textDecoration: "none",
          }}
        >
          Launch app
          <ArrowUpRight size={14} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
