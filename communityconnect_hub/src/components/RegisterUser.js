import React, { useState } from "react";

// PUBLIC_INTERFACE
function RegisterUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    receiveUpdates: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(evt) {
    const { name, value, type, checked } = evt.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    // Fake validation
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please provide your name and email.");
      return;
    }
    setSubmitted(false);
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  }

  return (
    <div>
      <h2 className="cc-section-title">Register</h2>
      <p className="cc-section-desc">
        Sign up to personalize your experience and get community alerts.
      </p>
      <form className="cc-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} autoComplete="off" />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="off" />
        </label>
        <label>
          <input type="checkbox" name="receiveUpdates" checked={form.receiveUpdates} onChange={handleChange} />
          &nbsp;Subscribe to community updates & event alerts
        </label>
        <button className="cc-btn cc-btn-secondary" type="submit">
          Register
        </button>
        {error && (
          <div style={{ color: "var(--cc-secondary)", fontWeight: 500 }}>{error}</div>
        )}
        {submitted && (
          <div style={{ color: "var(--cc-accent)", marginTop: 10 }}>
            Thank you for registering! Please check your email for confirmation.
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterUser;
