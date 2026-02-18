import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Compare", href: "#compare" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-8 h-[58px] max-w-[1120px] mx-auto w-full">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0" style={{ textDecoration: "none" }}>
          <div className="w-[26px] h-[26px] rounded-[5px] shrink-0" style={{ backgroundColor: "#09090B" }} />
          <span
            className="hidden sm:block"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14.5,
              letterSpacing: "-0.1px",
              color: "#09090B",
            }}
          >
            Fil Hyperspace
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3.5 py-1.5 rounded-md transition-colors hover:bg-black/[0.04]"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#52525B",
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <a
            href="#"
            className="flex items-center gap-0.5 px-3 py-1.5 rounded-md hover:bg-black/[0.04] transition-colors"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "#52525B",
              textDecoration: "none",
            }}
          >
            Docs
            <ArrowUpRight size={12} strokeWidth={2} />
          </a>
          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center gap-1 px-4 py-[6px] rounded-full border-2 border-blue-500 bg-transparent transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/40"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 13.5,
              color: "#09090B",
              textDecoration: "none",
            }}
          >
            Launch app
            <ArrowUpRight size={12} strokeWidth={2} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-black/[0.04] transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          style={{ border: "none", backgroundColor: "transparent", cursor: "pointer" }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} color="#09090B" /> : <Menu size={18} color="#09090B" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-5 py-3 flex flex-col gap-0.5"
          style={{
            backgroundColor: "rgba(255,255,255,0.97)",
            borderColor: "rgba(0,0,0,0.06)",
          }}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                color: "#09090B",
                textDecoration: "none",
                display: "block",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors flex items-center gap-1"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "#09090B",
              textDecoration: "none",
            }}
          >
            Docs
            <ArrowUpRight size={13} />
          </a>
          <div className="pt-3 mt-1 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <a
              href="https://docs.filecoin.cloud/getting-started/"
              className="flex items-center justify-center gap-1 w-full px-4 py-2.5 rounded-full border-2 border-blue-500 bg-transparent transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/40"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "#09090B",
                textDecoration: "none",
              }}
            >
              Launch app
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
