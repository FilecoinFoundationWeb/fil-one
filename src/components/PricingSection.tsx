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
      className="flex flex-col gap-[52px] items-center px-[200px] py-[120px] w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      {/* Heading */}
      <div className="flex flex-col gap-6 items-center text-center w-[600px]">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 14,
            lineHeight: "1.3",
            letterSpacing: "0.14px",
            color: "#0090FF",
            textTransform: "uppercase",
          }}
        >
          Pricing
        </p>
        <h2
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            fontSize: 36,
            lineHeight: "1.3",
            letterSpacing: "-0.36px",
            color: "#09090B",
          }}
        >
          Simple, predictable pricing
        </h2>
      </div>

      {/* Cards */}
      <div className="flex gap-[52px] items-start w-full">
        {/* Pay-as-you-go */}
        <div
          className="flex flex-1 flex-col gap-10 items-center p-10 rounded-[20px] overflow-hidden border"
          style={{
            borderColor: "rgba(0,0,0,0.08)",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.06)",
          }}
        >
          <div className="w-full">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 20,
                lineHeight: "28px",
                color: "#09090B",
              }}
            >
              Pay-as-you-go
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-end gap-2 flex-wrap">
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 36,
                  lineHeight: "40px",
                  color: "#71717B",
                  textDecoration: "line-through",
                }}
              >
                $4.99
              </span>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 36,
                  lineHeight: "40px",
                  color: "#0090FF",
                }}
              >
                $0
              </span>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#71717B",
                }}
              >
                TB/month
              </span>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#71717B",
                }}
              >
                (Free for 14 days)
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "1.4",
                color: "#3F3F46",
              }}
            >
              Ideal for dynamic workloads or teams getting started with scalable, verifiable storage.
            </p>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

          <div className="flex flex-col gap-6 w-full">
            {PaygoFeatures.map((item) => (
              <div key={item} className="flex gap-[10px] items-center w-full">
                <Check size={20} color="#0090FF" className="shrink-0" />
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "1.4",
                    color: "#71717B",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center justify-center gap-1 w-full px-6 py-4 rounded-full overflow-hidden hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#0090FF",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: "28px",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            Try for free
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Business plan */}
        <div
          className="flex flex-1 flex-col gap-10 items-center p-10 rounded-[20px] overflow-hidden border"
          style={{
            borderColor: "rgba(0,0,0,0.08)",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.06)",
          }}
        >
          <div className="w-full">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 20,
                lineHeight: "28px",
                color: "#09090B",
              }}
            >
              Business plan
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <h3
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 36,
                lineHeight: "40px",
                color: "#0090FF",
              }}
            >
              Custom pricing
            </h3>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "1.4",
                color: "#3F3F46",
              }}
            >
              Ideal for enterprises with predictable storage needs or compliance-driven requirements.
            </p>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

          <div className="flex flex-col gap-6 w-full">
            {BusinessFeatures.map((item) => (
              <div key={item} className="flex gap-[10px] items-center w-full">
                <Check size={20} color="#0090FF" className="shrink-0" />
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "1.4",
                    color: "#71717B",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <a
            href="https://docs.filecoin.cloud/getting-started/"
            className="flex items-center justify-center w-full px-6 py-4 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "#E4E4E7",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: "28px",
              color: "#09090B",
              textDecoration: "none",
            }}
          >
            Contact sales team
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
