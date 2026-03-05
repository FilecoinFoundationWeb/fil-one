import { Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const comparisonRows = [
  {
    feature: "Architecture",
    traditional: "Centralized infrastructure operated by a single provider",
    filHyperspace: "Decentralized storage network across independent providers",
  },
  {
    feature: "S3 compatibility",
    traditional: "Native or S3-compatible APIs",
    filHyperspace: "Fully S3-compatible buckets and APIs",
  },
  {
    feature: "Scalability",
    traditional: "Scales technically, but costs increase significantly at large volumes",
    filHyperspace: "Optimized for multi-TB to PB-scale datasets",
  },
  {
    feature: "Data durability",
    traditional: "Provider-reported guarantees and SLAs",
    filHyperspace: "Cryptographically verifiable storage proofs",
  },
  {
    feature: "Vendor lock-in",
    traditional: "High switching costs between providers",
    filHyperspace: "Open infrastructure with no provider lock-in",
  },
  {
    feature: "Failure model",
    traditional: "Centralized failure domains and outages",
    filHyperspace: "Distributed storage with no single point of failure",
  },
  {
    feature: "Auditability",
    traditional: "Trust-based reporting from providers",
    filHyperspace: "On-chain verification of stored data",
  },
];

const whenRightChoice = [
  "Large datasets with long retention periods",
  "Teams seeking predictable costs at scale",
  "Workloads requiring verifiable durability",
  "Organizations avoiding vendor lock-in",
];

const cardBg = "#F0F8FF";
const cardBorder = "rgba(0, 144, 255, 0.18)";
const cardBorderTop = "rgba(0, 144, 255, 0.35)";

const ComparisonSection = () => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.04 });
  const { ref: bottomRef, inView: bottomInView } = useInView({ threshold: 0.1 });

  return (
    <section
      className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className={`flex flex-col gap-3 items-center text-center w-full max-w-[560px] reveal${headingInView ? " in-view" : ""}`}
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
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          Traditional Cloud vs Filecoin
        </h2>
      </div>

      {/* Table */}
      <div
        ref={tableRef}
        className={`w-full max-w-[900px] reveal${tableInView ? " in-view" : ""}`}
      >
        <div className="overflow-x-auto">
          <div style={{ minWidth: 560 }}>
            {/* Column headers */}
            <div className="grid w-full" style={{ gridTemplateColumns: "200px 1fr 1fr" }}>
              {/* Empty label col */}
              <div className="px-4 py-6" />
              {/* Traditional Cloud header */}
              <div className="px-6 py-6 flex items-center">
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 15,
                    color: "#09090B",
                  }}
                >
                  Traditional Cloud
                </span>
              </div>
              {/* FilHyperspace header — top of card */}
              <div
                className="px-6 py-6 rounded-t-2xl flex items-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderTop: `1px solid rgba(0,0,0,0.08)`,
                  borderLeft: `1px solid rgba(0,0,0,0.08)`,
                  borderRight: `1px solid rgba(0,0,0,0.08)`,
                }}
              >
                <svg width="88" height="25" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_5520_16996)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.9783 39.9999C8.95158 40.0421 -0.0495872 31.0077 0.000205594 19.9056C0.050413 8.93041 9.00769 -0.0657738 20.1092 0.000362338C31.052 0.0657024 40.0395 9.03361 39.954 20.169C39.87 31.0956 30.9734 40.0352 19.9783 39.9999Z" fill="#0090FF"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.4594 18.3832C24.2014 18.6297 25.904 18.8701 27.6594 19.1186C27.8071 18.5896 27.9327 18.1386 28.0766 17.623C26.2712 17.3555 24.5483 17.1002 22.6983 16.8261C23.3204 14.6216 23.8579 12.5138 24.53 10.4492C24.7514 9.76962 25.246 9.13173 25.7502 8.60391C26.4117 7.91213 27.3269 8.06539 27.8873 8.82559C28.122 9.14396 28.343 9.48068 28.6243 9.75318C28.9834 10.1006 29.5128 10.2695 29.8735 9.93129C30.1105 9.70923 30.1029 9.18676 30.125 8.79386C30.1338 8.63602 29.9479 8.45027 29.8193 8.30465C29.193 7.59453 28.3468 7.34304 27.4533 7.30558C25.4598 7.22188 24.0292 8.23968 22.9059 9.77803C21.793 11.3026 21.3048 13.0951 20.7735 14.8666C20.6185 15.3837 20.4857 15.9077 20.33 16.4753C18.3891 16.194 16.5273 15.9242 14.6113 15.6471C14.5433 16.1649 14.48 16.6507 14.4124 17.1667C16.3094 17.4591 18.1243 17.7385 19.9998 18.0274C19.7487 19.0868 19.5147 20.0756 19.2743 21.09C17.4346 20.8324 15.6903 20.5889 13.9342 20.3428C13.8597 20.9107 13.8036 21.3399 13.7372 21.8452C15.501 22.115 17.2013 22.3749 18.9132 22.6367C18.9132 22.8301 18.9342 22.9425 18.9097 23.0445C18.3636 25.3755 17.8555 27.7169 17.243 30.03C16.9502 31.133 16.4792 32.1978 15.5636 32.9729C14.8097 33.6108 13.9815 33.5041 13.4147 32.7126C13.1586 32.356 12.9448 31.9325 12.6067 31.6826C12.3597 31.4995 11.8101 31.3894 11.6288 31.5362C11.3601 31.7541 11.1655 32.236 11.1884 32.5899C11.2078 32.9037 11.5093 33.2706 11.7861 33.4846C12.7185 34.2036 13.8158 34.3079 14.9277 34.0889C16.7899 33.7216 18.1033 32.5582 18.9174 30.9128C19.5571 29.6195 20.0361 28.2382 20.4888 26.8634C20.8987 25.6186 21.1769 24.3302 21.5243 23.017C23.3533 23.2826 25.146 23.5429 26.9758 23.8085C27.1269 23.2857 27.2632 22.8125 27.4102 22.303C25.4956 22.0214 23.6689 21.7519 21.8266 21.4806C22.0479 20.3978 22.2449 19.4335 22.4594 18.3832Z" fill="white"/>
                    <path d="M54.1319 28.6819V20.8585H62.8616V18.2915H54.1319V13.5485H63.3996V10.957H51.0264V28.6819H54.1319ZM68.3252 13.8908V10.957H65.4152V13.8908H68.3252ZM68.3252 28.6819V15.5288H65.4152V28.6819H68.3252ZM74.5076 28.6819V10.957H71.5977V28.6819H74.5076ZM83.6855 28.9997C87.06 28.9997 89.0652 26.8483 89.6521 24.7458H86.7911C86.2775 25.9926 85.1038 26.5794 83.5632 26.5794C81.9004 26.5794 80.1887 25.3814 79.9931 22.9366H89.7988C90.0678 18.5359 87.5246 15.2354 83.4899 15.2354C79.773 15.2354 77.0343 18.047 77.0343 22.0076C77.0343 25.797 79.4551 28.9997 83.6855 28.9997ZM86.84 20.8096H79.9931C80.2621 18.3404 82.1205 17.5091 83.4899 17.5091C85.2016 17.5091 86.7666 18.756 86.84 20.8096ZM98.0842 28.9997C100.896 28.9997 103.611 27.2639 104.197 24.1835H101.361C100.97 25.9437 99.5758 26.5794 98.1331 26.5794C96.4214 26.5794 94.7586 25.2347 94.7586 22.1054C94.7586 19.0005 96.3725 17.6558 98.2064 17.6558C99.7959 17.6558 100.994 18.6337 101.263 20.0273H104.1C103.586 17.118 101.092 15.2354 98.2064 15.2354C94.2695 15.2354 91.7508 18.2181 91.7508 22.1298C91.7508 26.0415 94.2695 28.9997 98.0842 28.9997ZM112.38 28.9997C115.583 28.9997 118.86 26.8972 118.86 22.1298C118.86 17.3869 115.583 15.2354 112.38 15.2354C109.177 15.2354 105.9 17.3869 105.9 22.1298C105.9 26.8972 109.177 28.9997 112.38 28.9997ZM112.38 26.6283C110.522 26.6283 108.908 25.1858 108.908 22.1298C108.908 19.0982 110.522 17.6069 112.38 17.6069C114.239 17.6069 115.852 19.0982 115.852 22.1298C115.852 25.1858 114.239 26.6283 112.38 26.6283ZM124.365 13.8908V10.957H121.455V13.8908H124.365ZM124.365 28.6819V15.5288H121.455V28.6819H124.365ZM130.548 28.6819V21.6897C130.548 19.3183 131.355 17.6069 133.604 17.6069C135.854 17.6069 136.099 19.3672 136.099 21.1274V28.6819H139.008V20.4184C139.008 17.2891 137.712 15.2354 134.534 15.2354C132.675 15.2354 131.306 15.9933 130.548 17.3624V15.5288H127.638V28.6819H130.548Z" fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_5520_16996">
                      <rect width="140" height="40" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Data rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className="grid w-full"
                style={{ gridTemplateColumns: "200px 1fr 1fr" }}
              >
                {/* Feature label */}
                <div
                  className="px-4 py-5 flex items-center"
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
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
                {/* Traditional Cloud value */}
                <div
                  className="px-6 py-5 flex items-center"
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: "1.45",
                      color: "#71717A",
                    }}
                  >
                    {row.traditional}
                  </span>
                </div>
                {/* FilHyperspace value — inside card */}
                <div
                  className="px-6 py-5 flex items-center"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderTop: `1px solid rgba(0,0,0,0.08)`,
                    borderLeft: `1px solid rgba(0,0,0,0.08)`,
                    borderRight: `1px solid rgba(0,0,0,0.08)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: "1.45",
                      color: "#09090B",
                    }}
                  >
                    {row.filHyperspace}
                  </span>
                </div>
              </div>
            ))}

            {/* CTA row — bottom of card */}
            <div
              className="grid w-full"
              style={{ gridTemplateColumns: "200px 1fr 1fr" }}
            >
              <div className="px-4 pt-4" />
              <div className="px-6 pt-4" />
              <div
                className="px-6 py-5 rounded-b-2xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderTop: `1px solid rgba(0,0,0,0.08)`,
                  borderBottom: `1px solid rgba(0,0,0,0.08)`,
                  borderLeft: `1px solid rgba(0,0,0,0.08)`,
                  borderRight: `1px solid rgba(0,0,0,0.08)`,
                }}
              >
                <a
                  href="https://fil-hyperspace.vercel.app/"
                  className="btn-primary w-full"
                >
                  <span className="btn-primary-inner w-full justify-center">
                    Contact sales
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* When FilHyperspace is the right choice */}
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
          When Filecoin is the right choice
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3" style={{ maxWidth: 440 }}>
          {whenRightChoice.map((item) => (
            <div key={item} className="flex gap-3 items-center">
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
      </div>
    </section>
  );
};

export default ComparisonSection;
