import React, { useState } from "react";

// PUBLIC_INTERFACE
function FeedbackForm() {
  const [form, setForm] = useState({
    feedback: "",
    contact: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.feedback.trim().length < 8) {
      setError("Please provide more details in your feedback.");
      return;
    }
    setSent(false);
    setTimeout(() => {
      setSent(true);
    }, 750);
  }

  return (
    <div>
      <h2 className="cc-section-title">Feedback & Suggestions</h2>
      <p className="cc-section-desc">
        Let us know how we can improve CommunityConnect Hub!
      </p>
      <form className="cc-form" onSubmit={handleSubmit}>
        <label>
          Feedback
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            rows={4}
            placeholder="Your message here..."
          />
        </label>
        <label>
          Contact (optional)
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Your email or phone"
          />
        </label>
        <button className="cc-btn cc-btn-accent" type="submit">
          Send Feedback
        </button>
        {error && (
          <div style={{ color: "var(--cc-secondary)", fontWeight: 500 }}>{error}</div>
        )}
        {sent && (
          <div style={{ color: "var(--cc-accent)", marginTop: 10 }}>
            Thank you for your feedback!
          </div>
        )}
      </form>
    </div>
  );
}

export default FeedbackForm;
