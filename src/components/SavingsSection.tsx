import { useState, useRef, useEffect } from "react";
import type React from "react";

const STORAGE_COLOR = "#1EBFFF";
const EGRESS_COLOR = "#ed962a";

const providerCosts = (storage: number, egress: number) => [
  { label: "Filecoin", storage: storage * 4.99, egress: 0, storageColor: STORAGE_COLOR },
  {
    label: "Backblaze",
    storage: storage * 6.00,
    egress: Math.max(0, egress - storage * 3) * 10.24,
    storageColor: STORAGE_COLOR,
    egressColor: EGRESS_COLOR,
  },
  { label: "Wasabi", storage: storage * 6.99, egress: 0, storageColor: STORAGE_COLOR },
  {
    label: "AWS Glacier\nDeep Archive\n(us-east-2)",
    storage: storage * 1.03,
    egress: egress * 92.16,
    storageColor: STORAGE_COLOR,
    egressColor: EGRESS_COLOR,
  },
  {
    label: "AWS Glacier\nDeep Archive\n(eu-central-1)",
    storage: storage * 1.86,
    egress: egress * 92.16,
    storageColor: STORAGE_COLOR,
    egressColor: EGRESS_COLOR,
  },
  {
    label: "AWS S3\nStandard\n(us-east-2)",
    storage: storage * 23.55,
    egress: egress * 92.16,
    storageColor: STORAGE_COLOR,
    egressColor: EGRESS_COLOR,
  },
];

const CHART_HEIGHT = 320;

const SavingsSection = () => {
  const [storage, setStorage] = useState(1);
  const [storageInput, setStorageInput] = useState("1");
  const [egress, setEgress] = useState(1);
  const [egressInput, setEgressInput] = useState("1");
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: React.ReactNode } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hide = () => setTooltip(null);
    window.addEventListener("scroll", hide, true);
    return () => window.removeEventListener("scroll", hide, true);
  }, []);

  const costs = providerCosts(storage, egress);
  const maxTotal = Math.max(...costs.map((c) => (c.storage || 0) + (c.egress || 0)), 1);
  const rawStep = maxTotal / 5;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = Math.ceil(rawStep / magnitude) * magnitude;
  const ticks: number[] = [];
  for (let v = step; v <= maxTotal * 1.05; v += step) ticks.push(v);
  const chartMax = ticks[ticks.length - 1] ?? maxTotal;

  return (
    <section
      ref={sectionRef}
      id="compare"
      className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, calc(-100% - 8px))" }}
        >
          <div style={{ backgroundColor: "#09090B", borderRadius: 8, padding: "7px 11px", fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#FFFFFF", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            {tooltip.content}
          </div>
        </div>
      )}

      {/* Heading */}
      <div className="flex flex-col gap-3 items-center text-center w-full max-w-[560px]">
        <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#A1A1AA", textTransform: "uppercase" }}>
          Compare
        </p>
        <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, lineHeight: "1.2", letterSpacing: "-0.02em", color: "#09090B" }}>
          See how much you can save
        </h2>
        <p className="text-[14.5px]" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.6", color: "#71717A", maxWidth: 440 }}>
          Our flat-rate storage is just $4.99 per TB/month, with no retrieval costs and no hidden egress fees.
        </p>
      </div>

      {/* Chart card */}
      <div
        className="flex flex-col gap-6 md:gap-10 items-center p-6 sm:p-8 md:p-10 rounded-2xl border w-full max-w-[1120px]"
        style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "transparent", boxShadow: "none" }}
      >
        {/* Sliders */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center w-full">
          {/* Storage slider */}
          <div className="flex flex-1 flex-col gap-2.5 min-w-0 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: STORAGE_COLOR }} />
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#52525B" }}>Storage amount</span>
              </div>
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, color: "#09090B" }}>{storage} TB</span>
            </div>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1">
                <input
                  type="range" min={1} max={10240} value={storage}
                  onChange={(e) => { setStorage(+e.target.value); setStorageInput(e.target.value); }}
                  className="w-full"
                  style={{ appearance: "none", height: 6, borderRadius: 100, background: `linear-gradient(to right, #09090B ${((storage - 1) / 10239) * 100}%, #D4D4D8 ${((storage - 1) / 10239) * 100}%)`, outline: "none" }}
                />
              </div>
              <input
                type="number" min={1} max={10240} value={storageInput}
                onChange={(e) => setStorageInput(e.target.value)}
                onBlur={(e) => { const v = Math.min(10240, Math.max(1, +e.target.value || 1)); setStorage(v); setStorageInput(String(v)); }}
                className="rounded-lg border text-center"
                style={{ borderColor: "rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF", minWidth: 72, width: 72, padding: "4px 6px", fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#09090B", outline: "none" }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-10 self-end mb-1" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />

          {/* Egress slider */}
          <div className="flex flex-1 flex-col gap-2.5 min-w-0 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: "#ed962a" }} />
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#52525B" }}>Egress per month</span>
              </div>
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, color: "#09090B" }}>{egress} TB</span>
            </div>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1">
                <input
                  type="range" min={1} max={10240} value={egress}
                  onChange={(e) => { setEgress(+e.target.value); setEgressInput(e.target.value); }}
                  className="w-full"
                  style={{ appearance: "none", height: 6, borderRadius: 100, background: `linear-gradient(to right, #09090B ${((egress - 1) / 10239) * 100}%, #D4D4D8 ${((egress - 1) / 10239) * 100}%)`, outline: "none" }}
                />
              </div>
              <input
                type="number" min={1} max={10240} value={egressInput}
                onChange={(e) => setEgressInput(e.target.value)}
                onBlur={(e) => { const v = Math.min(10240, Math.max(1, +e.target.value || 1)); setEgress(v); setEgressInput(String(v)); }}
                className="rounded-lg border text-center"
                style={{ borderColor: "rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF", minWidth: 72, width: 72, padding: "4px 6px", fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#09090B", outline: "none" }}
              />
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="w-full overflow-hidden" onMouseLeave={() => setTooltip(null)}>
          {/* PILL_H=28, pill_gap=8 → bars start at top=36; LABEL_H~50, label_gap=10 */}
          <div className="flex min-w-[400px] w-full" style={{ height: CHART_HEIGHT + 36 + 80 }}>
            {/* Y-axis labels */}
            <div className="relative shrink-0" style={{ width: 48, height: CHART_HEIGHT, marginTop: 36, flexShrink: 0 }}>
              {ticks.map((v) => {
                const y = CHART_HEIGHT - (v / chartMax) * CHART_HEIGHT;
                return (
                  <span key={v} style={{ position: "absolute", right: 0, top: y - 8, fontFamily: "'Funnel Sans', sans-serif", fontSize: 10.5, color: "#A1A1AA", lineHeight: "1", whiteSpace: "nowrap" }}>
                    ${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(0)}
                  </span>
                );
              })}
            </div>

            {/* Chart area */}
            <div className="relative flex-1">
              {/* Grid lines */}
              {ticks.map((v) => {
                const y = CHART_HEIGHT - (v / chartMax) * CHART_HEIGHT;
                return <div key={v} className="absolute left-0 right-0" style={{ top: 36 + y, height: 1, background: "rgba(0,0,0,0.05)" }} />;
              })}
              {/* Baseline */}
              <div className="absolute left-0 right-0" style={{ top: 36 + CHART_HEIGHT, height: 1, background: "rgba(0,0,0,0.12)" }} />

              {/* Price pills row */}
              <div className="absolute left-0 right-0 flex gap-3" style={{ top: 0 }}>
                {costs.map((c, i) => {
                  const total = (c.storage || 0) + (c.egress || 0);
                  const isFilecoin = i === 0;
                  return (
                    <div key={i} className="flex-1 flex justify-center">
                      <div
                        className="inline-flex items-center justify-center px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: isFilecoin ? "#09090B" : "rgba(0,0,0,0.06)" }}
                      >
                        <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: isFilecoin ? 600 : 400, fontSize: isFilecoin ? 13 : 12, color: isFilecoin ? "#FFFFFF" : "#71717A", whiteSpace: "nowrap" }}>
                          ${total.toFixed(2)}/mo
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bars */}
              <div className="absolute left-0 right-0 flex items-end gap-3" style={{ top: 36, height: CHART_HEIGHT }}>
                {costs.map((c, i) => {
                  const total = (c.storage || 0) + (c.egress || 0);
                  const storageHeight = c.egressColor
                    ? Math.max(((c.storage || 0) / chartMax) * CHART_HEIGHT, 3)
                    : Math.max((total / chartMax) * CHART_HEIGHT, 3);
                  const egressHeight = c.egressColor
                    ? Math.max(((c.egress || 0) / chartMax) * CHART_HEIGHT, 0)
                    : 0;
                  const isFilecoin = i === 0;
                  return (
                    <div key={i} className="flex-1 w-full flex flex-col justify-end" style={{ height: CHART_HEIGHT }}>
                      {c.egressColor && egressHeight > 0 && (
                        <div
                          style={{ height: egressHeight, backgroundColor: c.egressColor, opacity: 0.75, borderRadius: "5px 5px 0 0", width: "100%", transition: "height 0.35s ease", cursor: "pointer" }}
                          onMouseEnter={(e) => {
                            const r = e.currentTarget.getBoundingClientRect();
                            setTooltip({ x: r.left + r.width / 2, y: r.top, content: <span><span style={{ color: EGRESS_COLOR }}>Egress</span>{" "}${(c.egress || 0).toFixed(2)}/mo</span> });
                          }}
                        />
                      )}
                      <div
                        style={{ height: storageHeight, backgroundColor: c.storageColor ?? STORAGE_COLOR, borderRadius: c.egressColor && egressHeight > 0 ? "0" : "5px 5px 0 0", width: "100%", transition: "height 0.35s ease", opacity: isFilecoin ? 1 : 0.5, cursor: "pointer" }}
                        onMouseEnter={(e) => {
                          const r = e.currentTarget.getBoundingClientRect();
                          setTooltip({ x: r.left + r.width / 2, y: r.top, content: <span><span style={{ color: STORAGE_COLOR }}>Storage</span>{" "}${(c.storage || 0).toFixed(2)}/mo</span> });
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Labels */}
              <div className="absolute left-0 right-0 flex gap-3" style={{ top: 36 + CHART_HEIGHT + 10 }}>
                {costs.map((c, i) => (
                  <div key={i} className="flex-1 text-center">
                    <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: i === 0 ? 600 : 400, fontSize: 11.5, lineHeight: "1.4", color: i === 0 ? "#09090B" : "#A1A1AA", display: "block" }}>
                      {c.label.split("\n").map((line, j) => (
                        <span key={j}>{line}{j < c.label.split("\n").length - 1 && <br />}</span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsSection;
