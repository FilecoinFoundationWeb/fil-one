import { useState } from "react";

const WaitlistInput = ({ className = "" }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
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
        className="btn-primary shrink-0"
        style={{ border: "none", cursor: "pointer" }}
      >
        <span className="btn-primary-inner" style={{ padding: "8px 18px", fontSize: 14.5 }}>
          Join waitlist
        </span>
      </button>
    </form>
  );
};

export default WaitlistInput;
