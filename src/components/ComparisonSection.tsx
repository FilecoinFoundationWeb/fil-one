import { Check, Minus, X } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type CellValue = "check" | "x" | "warn";

const comparisonRows: {
  feature: string;
  filone: CellValue;
  aws: CellValue;
  backblaze: CellValue;
  wasabi: CellValue;
}[] = [
  { feature: "S3-compatible API",               filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "Works with existing SDKs & tools", filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "Standard buckets & object storage", filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "Drop-in for existing S3 workflows", filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "API key authentication",            filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "Data integrity verification",       filone: "check", aws: "warn",  backblaze: "warn",  wasabi: "warn"  },
  { feature: "No single-provider dependency",     filone: "check", aws: "x",     backblaze: "x",     wasabi: "x"     },
  { feature: "Auditable version history",         filone: "check", aws: "x",     backblaze: "x",     wasabi: "x"     },
  { feature: "Optimized for large datasets",      filone: "check", aws: "warn",  backblaze: "warn",  wasabi: "warn"  },
  { feature: "Cost-efficient long-term storage",  filone: "check", aws: "warn",  backblaze: "check", wasabi: "check" },
];

const samenessItems = [
  "Same S3-compatible APIs — drop-in replacement",
  "Same tooling: AWS CLI, rclone, boto3, s3cmd",
  "Same multipart upload & presigned URL workflows",
  "No egress fees — ever",
];

const renderCell = (value: CellValue, isFilOne = false) => {
  if (value === "check") {
    return <Check size={16} strokeWidth={2.5} color={isFilOne ? "#0090FF" : "#A1A1AA"} />;
  }
  if (value === "x") {
    return <X size={15} strokeWidth={2.5} color="#A1A1AA" />;
  }
  // warn
  return <Minus size={15} strokeWidth={2} color="#A1A1AA" />;
};

const colHeader = (label: string) => (
  <span
    style={{
      fontFamily: "'Funnel Sans', sans-serif",
      fontWeight: 500,
      fontSize: 13,
      color: "#09090B",
    }}
  >
    {label}
  </span>
);

const ComparisonSection = () => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.04 });
  const { ref: bottomRef, inView: bottomInView } = useInView({ threshold: 0.1 });

  // Shared border styles for FilOne card column
  const filoneCardStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    backgroundColor: "#FFFFFF",
    borderLeft: "1px solid rgba(0,0,0,0.08)",
    borderRight: "1px solid rgba(0,0,0,0.08)",
    ...extra,
  });

  return (
    <section
      id="compare"
      className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className={`flex flex-col gap-3 items-center text-center w-full max-w-[600px] reveal${headingInView ? " in-view" : ""}`}
      >
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
          Comparison
        </p>
        <h2
          className="text-[26px] md:text-[32px]"
          style={{
            fontFamily: "'Aspekta', sans-serif",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          Cloud Storage Comparison
        </h2>
      </div>

      {/* Table */}
      <div
        ref={tableRef}
        className={`w-full max-w-[960px] reveal${tableInView ? " in-view" : ""}`}
      >
        {/* ── Desktop table (md+) ── */}
        <div className="hidden md:block overflow-x-auto">
          <div style={{ minWidth: 620 }}>
            {/* Column headers */}
            <div className="grid w-full" style={{ gridTemplateColumns: "200px 1fr 1fr 1fr 1fr" }}>
              <div className="px-4 py-6" />
              <div className="px-5 py-6 flex items-center justify-center">{colHeader("AWS (S3)")}</div>
              <div className="px-5 py-6 flex items-center justify-center">{colHeader("Backblaze B2")}</div>
              <div className="px-5 py-6 flex items-center justify-center">{colHeader("Wasabi")}</div>
              <div
                className="px-5 py-6 rounded-t-2xl flex items-center justify-center"
                style={filoneCardStyle({ borderTop: "1px solid rgba(0,0,0,0.08)" })}
              >
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#09090B",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Fil One
                </span>
              </div>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid w-full"
                style={{ gridTemplateColumns: "200px 1fr 1fr 1fr 1fr" }}
              >
                <div
                  className="px-4 py-4 flex items-center"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#09090B",
                    }}
                  >
                    {row.feature}
                  </span>
                </div>
                <div
                  className="px-5 py-4 flex items-center justify-center"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {renderCell(row.aws)}
                </div>
                <div
                  className="px-5 py-4 flex items-center justify-center"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {renderCell(row.backblaze)}
                </div>
                <div
                  className="px-5 py-4 flex items-center justify-center"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {renderCell(row.wasabi)}
                </div>
                <div
                  className="px-5 py-4 flex items-center justify-center"
                  style={filoneCardStyle({ borderTop: "1px solid rgba(0,0,0,0.08)" })}
                >
                  {renderCell(row.filone, true)}
                </div>
              </div>
            ))}

            {/* CTA row */}
            <div className="grid w-full" style={{ gridTemplateColumns: "200px 1fr 1fr 1fr 1fr" }}>
              <div className="px-4 pt-4" />
              <div className="px-5 pt-4" />
              <div className="px-5 pt-4" />
              <div className="px-5 pt-4" />
              <div
                className="px-5 py-5 rounded-b-2xl"
                style={filoneCardStyle({
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                })}
              >
                <a href="https://fil-hyperspace.vercel.app/" className="btn-primary w-full">
                  <span className="btn-primary-inner w-full justify-center">Contact sales</span>
                </a>
              </div>
            </div>

            {/* Footnote */}
            <p className="mt-4 px-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#A1A1AA" }}>
              — Possible, but significantly more expensive at scale.
            </p>
          </div>
        </div>

        {/* ── Mobile layout (< md) ── */}
        <div className="md:hidden overflow-x-auto">
          <div style={{ minWidth: 500 }}>
            {/* Column headers */}
            <div className="grid" style={{ gridTemplateColumns: "150px 1fr 1fr 1fr 1fr" }}>
              <div className="pr-2 py-4" />
              <div className="px-3 py-4 flex items-center justify-center">
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 11.5, color: "#71717A" }}>AWS</span>
              </div>
              <div className="px-3 py-4 flex items-center justify-center">
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 11.5, color: "#71717A" }}>Backblaze</span>
              </div>
              <div className="px-3 py-4 flex items-center justify-center">
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 11.5, color: "#71717A" }}>Wasabi</span>
              </div>
              <div
                className="px-3 py-4 rounded-t-xl flex items-center justify-center"
                style={filoneCardStyle({ borderTop: "1px solid rgba(0,0,0,0.08)" })}
              >
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 11.5, color: "#09090B" }}>Fil One</span>
              </div>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid"
                style={{ gridTemplateColumns: "150px 1fr 1fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div className="pr-2 py-3 flex items-center">
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 11.5, color: "#09090B" }}>
                    {row.feature}
                  </span>
                </div>
                <div className="px-3 py-3 flex items-center justify-center">{renderCell(row.aws)}</div>
                <div className="px-3 py-3 flex items-center justify-center">{renderCell(row.backblaze)}</div>
                <div className="px-3 py-3 flex items-center justify-center">{renderCell(row.wasabi)}</div>
                <div
                  className="px-3 py-3 flex items-center justify-center"
                  style={filoneCardStyle({ borderTop: "1px solid rgba(0,0,0,0.08)" })}
                >
                  {renderCell(row.filone, true)}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="grid" style={{ gridTemplateColumns: "150px 1fr 1fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <div />
              <div />
              <div />
              <div />
              <div
                className="px-3 py-4 rounded-b-xl"
                style={filoneCardStyle({
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                })}
              >
                <a href="https://fil-hyperspace.vercel.app/" className="btn-primary w-full">
                  <span className="btn-primary-inner w-full justify-center" style={{ fontSize: 12, padding: "7px 10px" }}>
                    Contact sales
                  </span>
                </a>
              </div>
            </div>

            {/* Footnote */}
            <p className="mt-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#A1A1AA" }}>
              — Possible, but significantly more expensive at scale.
            </p>
          </div>
        </div>
      </div>

      {/* Sameness callouts */}
      <div
        ref={bottomRef}
        className={`flex flex-col gap-5 items-center w-full reveal${bottomInView ? " in-view" : ""}`}
      >
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            fontSize: 15,
            color: "#09090B",
            textAlign: "center",
          }}
        >
          Drop-in compatible with your existing stack
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3" style={{ maxWidth: 480 }}>
          {samenessItems.map((item) => (
            <div key={item} className="flex gap-3 items-start">
              <Check size={15} color="#0090FF" strokeWidth={2.5} className="shrink-0 mt-[2px]" />
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
      </div>
    </section>
  );
};

export default ComparisonSection;
