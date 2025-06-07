import React from "react";

/*
  === DESIGN AUDIT ===
  FeedbackPage provides a form for submitting feedback/requests.
  - Color/spacing: Consistent with dark theme.
  - Typographic scale: Good for title and body.
  - Form: Proper ARIA, required, and length limits; visual feedback is clear.
  - Accessibility: Focus/submit/failure handled, role="alert" for submitted message.
  - TODO:
    - Improve visible focus styling for textarea/submit button.
    - Add landmark/region role.
    - Enhance contrast for borders on light backgrounds.
    - Consider ARIA live/region for error messaging.
*/
// PUBLIC_INTERFACE
function FeedbackPage({ feedback, setFeedback }) {
  /** Feedback and feature request form page. */
  function handleFeedback(e) {
    e.preventDefault();
    setFeedback((prev) => ({ ...prev, submitted: true }));
  }
  function handleFeedbackChange(e) {
    const { value } = e.target;
    setFeedback((prev) => ({ ...prev, message: value, submitted: false }));
  }
  return (
    <section
      className="cc-unified-section"
      id="feedback"
      aria-label="Feedback section"
      role="region"
      tabIndex={-1}
      style={{
        marginTop: 42,
        maxWidth: 420,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ color: "var(--accent)", fontWeight: 800, fontSize: "1.5rem" }}>
        Send Feedback or Request a Feature
      </h2>
      <form
        className="cc-card"
        onSubmit={handleFeedback}
        aria-label="Feedback Form"
        style={{ background: "#121212", maxWidth: 410 }}
        tabIndex={0}
        role="form"
      >
        <textarea
          name="feedback"
          value={feedback.message}
          maxLength={500}
          required
          placeholder="Let us know your ideas, issues, or suggestions..."
          rows={4}
          onChange={handleFeedbackChange}
          style={{
            width: "100%",
            borderRadius: 6,
            padding: "10px 12px",
            border: "1.1px solid var(--secondary)",
            background: "#181818",
            color: "var(--accent)",
            fontSize: "1rem",
            marginBottom: 10,
            outline: "none"
          }}
          aria-label="Feedback message"
          aria-required="true"
          aria-describedby={feedback.message.trim() === "" ? "feedback-error" : undefined}
        />
        {feedback.message.trim() === "" && (
          <span
            id="feedback-error"
            style={{ color: "var(--secondary)", fontSize: ".96em", display: "block" }}
            aria-live="polite"
          >
            Please enter feedback.
          </span>
        )}
        <br />
        <button
          className="btn"
          style={{
            background: "var(--secondary)",
            outline: "none"
          }}
          type="submit"
          disabled={feedback.message.trim() === ""}
          aria-label="Submit feedback"
        >
          Submit
        </button>
        {feedback.submitted && (
          <div
            style={{
              color: "#fff",
              marginTop: 12,
              background: "#163216",
              borderRadius: 7,
              padding: "8px 12px",
              border: "1px solid #33FF33",
              fontSize: 16
            }}
            tabIndex={0}
            aria-live="polite"
            role="status"
          >
            Thank you for your feedback!
          </div>
        )}
      </form>
    </section>
  );
}

export default FeedbackPage;
