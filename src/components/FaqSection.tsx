import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const faqs = [
  {
    question: "Is Fil One fully S3-compatible?",
    answer:
      "Yes. Fil One supports the full S3 API — including buckets, objects, multipart uploads, presigned URLs, and access control. Any tool or SDK that works with S3 works with Fil One without code changes.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your data is stored across the Filecoin network — a decentralized network of independent storage providers distributed globally. Unlike traditional cloud storage, no single company or data center holds your data.",
  },
  {
    question: "Can I rotate or revoke API keys?",
    answer:
      "Yes. You can create, rotate, and revoke API keys at any time from your dashboard. Revoked keys lose access immediately.",
  },
  {
    question: "Is Fil One suitable for hot storage?",
    answer:
      "Fil One is optimized for warm and cold storage workloads — large datasets, backups, archives, and long-term retention. For latency-sensitive hot storage, we recommend pairing it with a CDN or edge cache.",
  },
  {
    question: "What is Filecoin?",
    answer:
      "Filecoin is a decentralized storage network that lets anyone rent out spare storage capacity. It uses cryptographic proofs to verify that your data is stored correctly over time — without relying on a single provider's word.",
  },
  {
    question: "What's the connection between Fil One and Filecoin?",
    answer:
      "Fil One is built on top of Filecoin. We handle deal-making, retrieval, and all the protocol-level complexity so you get a familiar S3 interface backed by Filecoin's decentralized storage network — without having to interact with Filecoin directly.",
  },
  {
    question: "Do I need to understand Filecoin to use Fil One?",
    answer:
      "No. Fil One handles all the Filecoin complexity under the hood. You interact with it like any S3-compatible service — no blockchain knowledge required.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: listRef, inView: listInView } = useInView({ threshold: 0.04 });

  return (
    <section
      id="faq"
      className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
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
          FAQs
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
          Frequently asked questions
        </h2>
      </div>

      {/* FAQ list */}
      <div
        ref={listRef}
        className={`w-full max-w-[720px] reveal${listInView ? " in-view" : ""}`}
      >
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex items-center justify-between w-full gap-4 py-5 text-left group transition-colors"
              >
                <span
                  className={`transition-colors group-hover:text-[#0090FF] ${isOpen ? "text-[#0090FF]" : "text-[#09090B]"}`}
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 15,
                    lineHeight: "1.4",
                  }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  size={17}
                  strokeWidth={2}
                  className={`shrink-0 transition-all duration-200 group-hover:text-[#0090FF] ${isOpen ? "text-[#0090FF]" : "text-[#A1A1AA]"}`}
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-200"
                style={{ maxHeight: isOpen ? 300 : 0, opacity: isOpen ? 1 : 0 }}
              >
                <p
                  className="pb-5"
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "1.65",
                    color: "#71717A",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
        {/* Bottom border */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />
      </div>
    </section>
  );
};

export default FaqSection;
