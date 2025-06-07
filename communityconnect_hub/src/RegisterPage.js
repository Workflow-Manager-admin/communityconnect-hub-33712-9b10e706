// === DESIGN AUDIT ===
// RegisterPage manages registration and account display.
// - Color palette: Dark, with accent colors for controls/fields/buttons.
// - Spacing: Forms/cards are spaced/padded for clarity and usability.
// - Typography: Consistent header and field label scale.
// - Accessibility: Proper labels, input ARIA, tab order, and required attributes.
// - TODO for polish:
//     - Focus styling (border/color/shadow) can be enhanced for fields/buttons.
//     - Add ARIA-live for any feedback or error field.
//     - Add a role/region for main account section.
//     - Provide skip link for a11y navigation.
//     - Provide button-like focus for Logout/register.

import React from "react";

// PUBLIC_INTERFACE
function RegisterPage({ user, regForm, setRegForm, setUser }) {
  /** User registration/account page. */
  function handleRegChange(e) {
    const { name, value, type, checked } = e.target;
    setRegForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  function handleRegister(e) {
    e.preventDefault();
    setUser({ ...regForm });
  }
  return (
    <section
      className="cc-unified-section"
      id="account"
      tabIndex={-1}
      aria-label="User Account and Registration Section"
      role="region"
      style={{ marginTop: 42, maxWidth: 430, marginLeft: "auto", marginRight: "auto" }}
    >
      <h2 style={{ color: "var(--accent)", fontWeight: 800, fontSize: "2rem" }}>
        {user ? "Your Account" : "Register for Updates"}
      </h2>
      {user ? (
        <div
          className="cc-card"
          style={{ background: "#181818", color: "var(--accent)", maxWidth: 350, marginBottom: 14 }}
          tabIndex={0}
          role="region"
          aria-label="User Account Information"
        >
          <div style={{ fontWeight: 500, fontSize: "1.1em" }}>
            Hello, {user.name ? user.name : "User"}!
          </div>
          <div>
            <span style={{ color: "var(--text-secondary)" }}>Email:</span>{" "}
            {user.email || ""}
          </div>
          <div>
            <span style={{ color: "var(--text-secondary)" }}>
              Subscribed to Alerts:
            </span>{" "}
            {user.subscribe ? "Yes" : "No"}
          </div>
          <button
            className="btn"
            style={{ marginTop: 10, background: "var(--secondary)" }}
            onClick={() => setUser(null)}
            tabIndex={0}
            aria-label="Log Out"
          >
            Log Out
          </button>
        </div>
      ) : (
        <form
          className="cc-card"
          style={{ background: "#181818", maxWidth: 350, color: "var(--accent)" }}
          onSubmit={handleRegister}
          aria-label="User Registration"
          role="form"
          tabIndex={0}
        >
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="reg-name" style={{ color: "var(--text-secondary)", marginBottom: 3, fontWeight: 500 }}>
              Name
            </label>
            <input
              id="reg-name"
              name="name"
              style={{
                width: "100%",
                borderRadius: 5,
                padding: "9px 13px",
                fontSize: "1rem",
                outline: "none",
                background: "#222",
                color: "var(--accent)",
                border: "1.1px solid var(--secondary)",
                marginTop: 3,
              }}
              type="text"
              value={regForm.name}
              maxLength={32}
              required
              onChange={handleRegChange}
              autoComplete="name"
              autoFocus
              aria-required="true"
            />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="reg-email" style={{ color: "var(--text-secondary)", marginBottom: 3, fontWeight: 500 }}>
              Email
            </label>
            <input
              id="reg-email"
              name="email"
              style={{
                width: "100%",
                borderRadius: 5,
                padding: "9px 13px",
                fontSize: "1rem",
                outline: "none",
                background: "#222",
                color: "var(--accent)",
                border: "1.1px solid var(--secondary)",
                marginTop: 3,
              }}
              type="email"
              required
              value={regForm.email}
              maxLength={48}
              onChange={handleRegChange}
              autoComplete="email"
              aria-required="true"
            />
          </div>
          <div style={{ marginBottom: 6 }}>
            <label style={{ fontSize: "1em" }}>
              <input
                type="checkbox"
                name="subscribe"
                checked={regForm.subscribe}
                onChange={handleRegChange}
                style={{ marginRight: 7, transform: "scale(1.1)" }}
                aria-checked={regForm.subscribe}
              />
              Subscribe to alerts/updates
            </label>
          </div>
          <button
            className="btn"
            style={{ background: "var(--secondary)" }}
            type="submit"
            aria-label="Register"
          >
            Register
          </button>
        </form>
      )}
    </section>
  );
}

export default RegisterPage;
