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
    <section className="user-section" id="account" style={{ marginTop: 42 }}>
      <h2 style={{ color: "var(--accent)" }}>
        {user ? "Your Account" : "Register for Updates"}
      </h2>
      {user ? (
        <div
          style={{
            background: "#181818",
            color: "var(--accent)",
            padding: 22,
            borderRadius: 10,
            border: "1.2px solid var(--border-color)",
            maxWidth: 350,
            marginBottom: 14,
          }}
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
          >
            Log Out
          </button>
        </div>
      ) : (
        <form
          style={{
            background: "#181818",
            padding: 22,
            borderRadius: 10,
            maxWidth: 350,
            border: "1.2px solid var(--border-color)",
            color: "var(--accent)"
          }}
          onSubmit={handleRegister}
          aria-label="User Registration"
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
              />
              Subscribe to alerts/updates
            </label>
          </div>
          <button
            className="btn"
            style={{ background: "var(--secondary)" }}
            type="submit"
          >
            Register
          </button>
        </form>
      )}
    </section>
  );
}

export default RegisterPage;
