import { useState } from "react";

// Cost model matching the Figma
const providerCosts = (storage: number, egress: number) => [
  { label: "Filecoin", storage: storage * 4.99, egress: 0, color: "#0090FF" },
  { label: "Backblaze", storage: storage * 6.0, egress: 0, color: "#0090FF" },
  { label: "Wasabi", storage: storage * 6.99, egress: 0, color: "#0090FF" },
  {
    label: "AWS Glacier\n(us-east-2)",
    storage: storage * 0.99,
    egress: egress * 90,
    storageColor: "#0090FF",
    egressColor: "#ed962a",
  },
  {
    label: "AWS Glacier\n(eu-central-1)",
    storage: storage * 0.99,
    egress: egress * 90,
    storageColor: "#0090FF",
    egressColor: "#ed962a",
  },
  {
    label: "AWS Glacier\n(ap-southeast-1)",
    storage: storage * 1.2,
    egress: egress * 90 + storage * 5,
    storageColor: "#0090FF",
    egressColor: "#ed962a",
  },
];

const CHART_HEIGHT = 240;

const SavingsSection = () => {
  const [storage, setStorage] = useState(1);
  const [egress, setEgress] = useState(1);

  const costs = providerCosts(storage, egress);
  const maxTotal = Math.max(...costs.map((c) => (c.storage || 0) + (c.egress || 0)), 1);

  return (
    <section
      id="compare"
      className="flex flex-col gap-[52px] items-center px-[200px] py-[120px] w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Heading */}
      <div className="flex flex-col gap-6 items-center text-center w-[600px]">
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "0.14px",
            color: "#0090FF",
            textTransform: "uppercase",
          }}
        >
          Compare
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
          See how much you can save
        </h2>
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "1.4",
            color: "#3F3F46",
            maxWidth: 480,
          }}
        >
          Our flat-rate storage is just $4.99 per TB/month, with no retrieval costs and no hidden egress fees.
        </p>
      </div>

      {/* Chart card */}
      <div
        className="flex flex-col gap-[60px] items-center p-[60px] rounded-[20px] border w-full"
        style={{ borderColor: "rgba(0,0,0,0.08)", overflow: "hidden", backgroundColor: "#F4F4F5" }}
      >
        {/* Sliders */}
        <div className="flex gap-20 items-center w-full">
          {/* Storage slider */}
          <div className="flex flex-1 flex-col gap-3 min-w-0">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {/* Blue dot */}
                <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: "#0090FF" }} />
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "1.5",
                    color: "#09090B",
                  }}
                >
                  Your storage amount in TB
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "1.5",
                  color: "#71717B",
                  opacity: 0.6,
                }}
              >
                {storage} TB
              </span>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={storage}
                  onChange={(e) => setStorage(+e.target.value)}
                  className="w-full"
                  style={{
                    appearance: "none",
                    height: 8,
                    borderRadius: 100,
                    background: `linear-gradient(to right, #09090B ${((storage - 1) / 499) * 100}%, #D4D4D8 ${((storage - 1) / 499) * 100}%)`,
                    outline: "none",
                  }}
                />
              </div>
              <div
                className="flex items-center px-3 py-[6px] rounded-[6px] border w-[60px]"
                style={{ borderColor: "rgba(0,0,0,0.15)", backgroundColor: "#FFFFFF" }}
              >
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "1.5",
                    color: "#09090B",
                  }}
                >
                  {storage}
                </span>
              </div>
            </div>
          </div>

          {/* Egress slider */}
          <div className="flex flex-1 flex-col gap-3 min-w-0">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {/* Orange dot */}
                <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: "#ed962a" }} />
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "1.5",
                    color: "#09090B",
                  }}
                >
                  Egress per month
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "1.5",
                  color: "#71717B",
                  opacity: 0.6,
                }}
              >
                {egress} TB
              </span>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={egress}
                  onChange={(e) => setEgress(+e.target.value)}
                  className="w-full"
                  style={{
                    appearance: "none",
                    height: 8,
                    borderRadius: 100,
                    background: `linear-gradient(to right, #09090B ${((egress - 1) / 99) * 100}%, #D4D4D8 ${((egress - 1) / 99) * 100}%)`,
                    outline: "none",
                  }}
                />
              </div>
              <div
                className="flex items-center px-3 py-[6px] rounded-[6px] border w-[60px]"
                style={{ borderColor: "rgba(0,0,0,0.15)", backgroundColor: "#FFFFFF" }}
              >
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "1.5",
                    color: "#09090B",
                  }}
                >
                  {egress}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="relative w-full" style={{ height: CHART_HEIGHT + 60 }}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: i * (CHART_HEIGHT / 5),
                height: 1,
                background: "rgba(0,0,0,0.06)",
              }}
            />
          ))}
          {/* Baseline */}
          <div
            className="absolute left-0 right-0"
            style={{ top: CHART_HEIGHT, height: 1, background: "rgba(0,0,0,0.15)" }}
          />

          {/* Bars */}
          <div
            className="absolute bottom-[40px] left-0 right-0 flex items-end gap-4"
            style={{ height: CHART_HEIGHT }}
          >
            {costs.map((c, i) => {
              const total = (c.storage || 0) + (c.egress || 0);
              const totalHeight = Math.max((total / maxTotal) * CHART_HEIGHT, 4);
              const storageHeight = c.egressColor
                ? Math.max(((c.storage || 0) / maxTotal) * CHART_HEIGHT, 4)
                : totalHeight;
              const egressHeight = c.egressColor
                ? Math.max(((c.egress || 0) / maxTotal) * CHART_HEIGHT, 0)
                : 0;
              const isFilecoin = i === 0;

              return (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  {/* Price pill */}
                  <div
                    className="flex items-center justify-center px-3 py-2 rounded-full mb-2"
                    style={{
                      backgroundColor: isFilecoin ? "#09090B" : "#E4E4E7",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: isFilecoin ? 600 : 400,
                        fontSize: isFilecoin ? 16 : 14,
                        color: isFilecoin ? "#FFFFFF" : "#3F3F46",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${total.toFixed(2)}/m
                    </span>
                  </div>

                  {/* Bar stack */}
                  <div
                    className="relative w-full flex flex-col justify-end"
                    style={{ height: CHART_HEIGHT }}
                  >
                    {c.egressColor && egressHeight > 0 && (
                      <div
                        style={{
                          height: egressHeight,
                          backgroundColor: c.egressColor,
                          borderRadius: "6px 6px 0 0",
                          width: "100%",
                          transition: "height 0.4s ease",
                        }}
                      />
                    )}
                    <div
                      style={{
                        height: storageHeight,
                        backgroundColor: c.egressColor ? (c.storageColor ?? "#0090FF") : "#0090FF",
                        borderRadius: c.egressColor && egressHeight > 0 ? "0" : "6px 6px 0 0",
                        width: "100%",
                        transition: "height 0.4s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Labels */}
          <div
            className="absolute left-0 right-0 flex gap-4"
            style={{ top: CHART_HEIGHT + 12 }}
          >
            {costs.map((c, i) => (
              <div key={i} className="flex-1 text-center">
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "1.4",
                    color: "#3F3F46",
                    display: "block",
                  }}
                >
                  {c.label.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < c.label.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsSection;
