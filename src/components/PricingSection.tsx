import { ArrowUpRight, Check } from "lucide-react";

const PaygoFeatures = [
  "Pay monthly",
  "No egress fees",
  "No API request fees",
  "Data integrity guarantees",
];

const BusinessFeatures = [
  "Purchase in 1, 3, or 5-year increments",
  "No egress or API request fees",
  "Data integrity guarantees",
  "Capacity assurance and deployment SLAs",
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      {/* Heading */}
      <div className="flex flex-col gap-3 items-center text-center w-full max-w-[560px]">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            color: "#A1A1AA",
            textTransform: "uppercase",
          }}
        >
          Pricing
        </p>
        <h2
          className="text-[26px] md:text-[32px]"
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          Simple, predictable pricing
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch w-full max-w-[1120px]">
        {/* Pay-as-you-go */}
        <div
          className="flex flex-1 flex-col gap-8 items-start p-8 rounded-2xl border"
          style={{
            borderColor: "rgba(0,0,0,0.07)",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex flex-col gap-1 w-full">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "#09090B",
              }}
            >
              Pay-as-you-go
            </p>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13.5,
                color: "#A1A1AA",
              }}
            >
              For teams getting started
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-end gap-2 flex-wrap">
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 28,
                  lineHeight: "1",
                  color: "#D4D4D8",
                  textDecoration: "line-through",
                }}
              >
                $4.99
              </span>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 40,
                  lineHeight: "1",
                  color: "#09090B",
                  letterSpacing: "-0.02em",
                }}
              >
                $0
              </span>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#A1A1AA",
                  paddingBottom: 4,
                }}
              >
                / TB / month
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13.5,
                lineHeight: "1.55",
                color: "#71717A",
              }}
            >
              Free for the first 14 days. No credit card required.
            </p>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

          <div className="flex flex-col gap-3.5 w-full">
            {PaygoFeatures.map((item) => (
              <div key={item} className="flex gap-3 items-center w-full">
                <Check size={15} color="#0090FF" strokeWidth={2.5} className="shrink-0" />
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "1.4",
                    color: "#52525B",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <a href="https://docs.filecoin.cloud/getting-started/" className="btn-primary w-full mt-auto">
            <span className="btn-primary-inner w-full justify-center">
              Try for free
              <ArrowUpRight size={13} strokeWidth={2} className="btn-arrow" />
            </span>
          </a>
        </div>

        {/* Business plan */}
        <div
          className="flex flex-1 flex-col gap-8 items-start p-8 rounded-2xl border"
          style={{
            borderColor: "rgba(0,0,0,0.07)",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex flex-col gap-1 w-full">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "#09090B",
              }}
            >
              Business plan
            </p>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13.5,
                color: "#A1A1AA",
              }}
            >
              For enterprises with scale
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 600,
                fontSize: 40,
                lineHeight: "1",
                color: "#09090B",
                letterSpacing: "-0.02em",
              }}
            >
              Custom
            </span>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13.5,
                lineHeight: "1.55",
                color: "#71717A",
              }}
            >
              Ideal for predictable storage needs or compliance-driven requirements.
            </p>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

          <div className="flex flex-col gap-3.5 w-full">
            {BusinessFeatures.map((item) => (
              <div key={item} className="flex gap-3 items-center w-full">
                <Check size={15} color="#0090FF" strokeWidth={2.5} className="shrink-0" />
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "1.4",
                    color: "#52525B",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <a href="https://docs.filecoin.cloud/getting-started/" className="btn-secondary w-full justify-center mt-auto">
            Contact sales team
            <ArrowUpRight size={13} strokeWidth={2} className="btn-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
