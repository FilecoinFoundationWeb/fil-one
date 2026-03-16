import { useState } from "react";

const HS_PORTAL_ID = "51191454";
const HS_FORM_GUID = "81067c08-e6eb-43ce-ad3c-2f5e2fca45bd";

const WaitlistInput = ({ className = "" }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [{ objectTypeId: "0-1", name: "email", value: email }],
            context: { pageUri: window.location.href, pageName: document.title },
          }),
        }
      );
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full ${className}`}
        style={{ backgroundColor: "#F4F4F5" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8L6.5 11.5L13 5" stroke="#09090B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14.5, color: "#3F3F46" }}>
          You're on the list!
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-0 ${className}`}
      style={{
        position: "relative",
        backgroundColor: "#FFFFFF",
        borderRadius: 9999,
        padding: "4px 4px 4px 20px",
        border: "1px solid rgba(0,0,0,0.10)",
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your work email"
        aria-label="Work email address"
        required
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          fontFamily: "'Funnel Sans', sans-serif",
          fontWeight: 400,
          fontSize: 14.5,
          color: "#09090B",
          flex: 1,
          minWidth: 0,
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary shrink-0"
        style={{ border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}
      >
        <span className="btn-primary-inner" style={{ padding: "8px 18px", fontSize: 14.5 }}>
          {loading ? "Joining…" : "Join waitlist"}
        </span>
      </button>
      {error && (
        <span style={{ position: "absolute", bottom: -20, left: 20, fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#EF4444" }}>
          Something went wrong. Please try again.
        </span>
      )}
    </form>
  );
};

export default WaitlistInput;
