import React, { useState } from "react";

/*
  === DESIGN AUDIT ===
  EventsPage shows a list and optional submission form if user is logged in.
  - Color palette: Dark background, secondary accent (red) for key elements.
  - Spacing/padding: Ample, responsive.
  - Font: Good hierarchy for event titles/dates/etc.
  - Navigation: Event form is tab-navigable; in list each LI is tabIndex=0 and ARIA-label.
  - Accessibility: Labels, required, aria-invalid/alerts, correct input types.
  - Feedback: "Event added!" uses role="polite."
  - TODO:
      - Add heading structure for improved screen reader navigation (currently just <h2>).
      - Improve visual focus state in event forms/fields.
      - Add skip-to-events link for a11y.
      - Consider making events deletable by admin/user.
      - Consider moving margin/padding style to CSS (for consistency).
*/
/**
 * EventsPage component
 * Displays the list of local events. If the user is logged in (registered), shows
 * an accessible, themed event submission form. New events are added for session only.
 * 
 * Props:
 *  - events: Array of event objects (initial events, from parent)
 *  - user: User object if authenticated; falsy/null if not logged in (optional, supports conditional logic)
 */
 // PUBLIC_INTERFACE
function EventsPage({ events = [] }) {
  // Manage local event state (merge session and submitted events)
  const [localEvents, setLocalEvents] = useState(events || []);
  const emptyForm = {
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    contact: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Helper: Validate form fields (now includes contact info)
  function validate(formObj) {
    let errs = {};
    if (!formObj.name.trim()) errs.name = "Event name is required";
    if (!formObj.date) errs.date = "Date is required";
    if (!formObj.time) errs.time = "Time is required";
    if (!formObj.location.trim()) errs.location = "Location is required";
    if (!formObj.contact.trim()) errs.contact = "Contact info is required";
    if (formObj.description.length > 300)
      errs.description = "Description is too long (300 character max)";
    // Basic future date check (optional)
    if (formObj.date && isNaN(Date.parse(formObj.date))) {
      errs.date = "Invalid date";
    }
    return errs;
  }

  // Handle field changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitted(false);
  }

  // Handle event submission
  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length !== 0) {
      setSubmitted(false);
      return;
    }
    // Add event to local state as latest event (top)
    setLocalEvents((prev) => [
      {
        ...form,
        name: form.name.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        contact: form.contact.trim(),
      },
      ...prev,
    ]);
    setForm(emptyForm);
    setSubmitted(true);
  }

  // Event form is always visible for this version, per requirements
  function renderEventForm() {
    return (
      <section
        aria-label="Add New Event"
        style={{
          margin: "34px 0 20px",
          background: "#181818",
          padding: "22px 18px",
          borderRadius: 11,
          border: "1.2px solid var(--border-color)",
          maxWidth: 430,
          boxShadow: "0 1px 10px #0003",
        }}
      >
        <h3
          style={{
            color: "var(--secondary)",
            fontSize: "1.23rem",
            fontWeight: 700,
            marginBottom: 14,
            marginTop: 0,
          }}
        >
          Submit a Community Event
        </h3>
        <form
          onSubmit={handleSubmit}
          aria-label="Event Submission Form"
          autoComplete="off"
        >
          {/* Event Name */}
          <div style={{ marginBottom: 12 }}>
            <label
              htmlFor="event-name"
              style={{
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              Event Name <span aria-hidden="true" style={{ color: "var(--secondary)" }}>*</span>
            </label>
            <input
              id="event-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={64}
              style={{
                width: "100%",
                marginTop: 3,
                borderRadius: 6,
                padding: "9px 13px",
                background: "#232323",
                color: "var(--accent)",
                border: "1.1px solid var(--secondary)",
                fontSize: "1rem",
                outline: "none",
                marginBottom: 2,
              }}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "event-name-err" : undefined}
            />
            {errors.name && (
              <div
                id="event-name-err"
                style={{
                  color: "var(--secondary)",
                  fontSize: "0.98em",
                  marginBottom: 2,
                }}
                role="alert"
              >
                {errors.name}
              </div>
            )}
          </div>
          {/* Date & Time */}
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label
                htmlFor="event-date"
                style={{ color: "var(--text-secondary)", fontWeight: 500 }}
              >
                Date <span aria-hidden="true" style={{ color: "var(--secondary)" }}>*</span>
              </label>
              <input
                id="event-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginTop: 3,
                  borderRadius: 6,
                  padding: "9px 10px",
                  background: "#232323",
                  color: "var(--accent)",
                  border: "1.1px solid var(--secondary)",
                  fontSize: "1rem",
                  outline: "none",
                  marginBottom: 2,
                }}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "event-date-err" : undefined}
              />
              {errors.date && (
                <div
                  id="event-date-err"
                  style={{
                    color: "var(--secondary)",
                    fontSize: ".98em",
                    marginBottom: 2,
                  }}
                  role="alert"
                >
                  {errors.date}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label
                htmlFor="event-time"
                style={{ color: "var(--text-secondary)", fontWeight: 500 }}
              >
                Time <span aria-hidden="true" style={{ color: "var(--secondary)" }}>*</span>
              </label>
              <input
                id="event-time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  marginTop: 3,
                  borderRadius: 6,
                  padding: "9px 10px",
                  background: "#232323",
                  color: "var(--accent)",
                  border: "1.1px solid var(--secondary)",
                  fontSize: "1rem",
                  outline: "none",
                  marginBottom: 2,
                }}
                aria-invalid={!!errors.time}
              />
              {errors.time && (
                <div
                  style={{
                    color: "var(--secondary)",
                    fontSize: ".98em",
                    marginBottom: 2,
                  }}
                  role="alert"
                >
                  {errors.time}
                </div>
              )}
            </div>
          </div>
          {/* Location */}
          <div style={{ marginBottom: 12 }}>
            <label
              htmlFor="event-location"
              style={{ color: "var(--text-secondary)", fontWeight: 500 }}
            >
              Location <span aria-hidden="true" style={{ color: "var(--secondary)" }}>*</span>
            </label>
            <input
              id="event-location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              required
              maxLength={64}
              style={{
                width: "100%",
                marginTop: 3,
                borderRadius: 6,
                padding: "9px 13px",
                background: "#232323",
                color: "var(--accent)",
                border: "1.1px solid var(--secondary)",
                fontSize: "1rem",
                outline: "none",
                marginBottom: 2,
              }}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? "event-location-err" : undefined}
            />
            {errors.location && (
              <div
                id="event-location-err"
                style={{
                  color: "var(--secondary)",
                  fontSize: "0.98em",
                  marginBottom: 2,
                }}
                role="alert"
              >
                {errors.location}
              </div>
            )}
          </div>
          {/* Contact Info */}
          <div style={{ marginBottom: 12 }}>
            <label
              htmlFor="event-contact"
              style={{ color: "var(--text-secondary)", fontWeight: 500 }}
            >
              Contact Info <span aria-hidden="true" style={{ color: "var(--secondary)" }}>*</span>
            </label>
            <input
              id="event-contact"
              name="contact"
              type="text"
              value={form.contact}
              onChange={handleChange}
              required
              maxLength={64}
              placeholder="Phone, email, or other contact"
              style={{
                width: "100%",
                marginTop: 3,
                borderRadius: 6,
                padding: "9px 13px",
                background: "#232323",
                color: "var(--accent)",
                border: "1.1px solid var(--secondary)",
                fontSize: "1rem",
                outline: "none",
                marginBottom: 2,
              }}
              aria-invalid={!!errors.contact}
              aria-describedby={errors.contact ? "event-contact-err" : undefined}
            />
            {errors.contact && (
              <div
                id="event-contact-err"
                style={{
                  color: "var(--secondary)",
                  fontSize: "0.98em",
                  marginBottom: 2,
                }}
                role="alert"
              >
                {errors.contact}
              </div>
            )}
          </div>
          {/* Description */}
          <div style={{ marginBottom: 12 }}>
            <label
              htmlFor="event-description"
              style={{ color: "var(--text-secondary)", fontWeight: 500 }}
            >
              Description (optional)
            </label>
            <textarea
              id="event-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={300}
              placeholder="Let the community know what to expect..."
              rows={3}
              style={{
                width: "100%",
                marginTop: 3,
                borderRadius: 6,
                padding: "9px 12px",
                background: "#232323",
                color: "var(--accent)",
                border: "1.1px solid var(--secondary)",
                fontSize: "1rem",
                outline: "none",
                resize: "vertical",
                marginBottom: 2,
              }}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "event-description-err" : undefined}
            />
            {errors.description && (
              <div
                id="event-description-err"
                style={{
                  color: "var(--secondary)",
                  fontSize: "0.98em",
                  marginBottom: 2,
                }}
                role="alert"
              >
                {errors.description}
              </div>
            )}
          </div>
          <button
            className="btn"
            style={{
              background: "var(--secondary)",
              color: "var(--accent)",
              fontWeight: 700,
              borderRadius: 7,
              marginTop: 2,
              fontSize: "1.04rem",
              padding: "10px 30px",
              border: "1.1px solid var(--secondary)",
            }}
            type="submit"
            disabled={
              !form.name.trim() ||
              !form.date ||
              !form.time ||
              !form.location.trim() ||
              !form.contact.trim()
            }
          >
            Add Event
          </button>
          {submitted && (
            <div
              style={{
                color: "var(--accent)",
                marginTop: 12,
                background: "#163216",
                borderRadius: 6,
                padding: "8px 12px",
                border: "1px solid #33FF33",
                fontSize: 15,
              }}
              tabIndex={0}
              aria-live="polite"
            >
              Event added! Thanks for contributing to your community.
            </div>
          )}
        </form>
      </section>
    );
  }

  // Render the list of events using the modern grid/card system and show contact info per requirements
  return (
    <section
      className="cc-unified-section"
      aria-label="Chennai Events"
      id="events-section"
      role="region"
      tabIndex={-1}
      style={{ maxWidth: 980, marginLeft: "auto", marginRight: "auto" }}
    >
      <h2 style={{ color: "var(--accent)", fontWeight: 800, fontSize: "2rem", marginBottom: 14 }}>
        Chennai Events <span role="img" aria-label="Chennai">🛕</span>
      </h2>
      {localEvents && localEvents.length ? (
        <div className="cc-card-grid" style={{ gap: "20px 16px", marginTop: 8 }}>
          {localEvents.map((ev, idx) => (
            <div
              key={idx}
              className="cc-card"
              style={{
                background: "#181f25",
                minWidth: 210,
                maxWidth: 340,
                flex: "1 1 220px",
                color: "var(--accent)"
              }}
              tabIndex={0}
              aria-label={`Event: ${ev.name} on ${ev.date} at ${ev.location}`}
            >
              <div className="cc-card-title" style={{ color: "var(--accent)", marginBottom: 2 }}>
                {ev.name}
              </div>
              <div className="cc-card-meta" style={{ color: "var(--secondary)", fontSize: ".98em" }}>
                {ev.date} &mdash; {ev.time}
              </div>
              <div style={{ fontSize: ".97em", marginTop: 2, color: "#fff9" }}>
                <span style={{ fontWeight: 500, color: "var(--text-secondary)" }}>Venue:</span> {ev.location}
              </div>
              {ev.contact && (
                <div style={{ fontSize: ".96em", color: "#b9bec9", marginTop: 4 }}>
                  <span style={{ fontWeight: 600, color: "var(--secondary)" }}>Contact:</span> {ev.contact}
                </div>
              )}
              {ev.description && (
                <div style={{ marginTop: 6, color: "#d1dbe6", fontSize: ".96em", lineHeight: 1.4 }}>
                  {ev.description}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: "var(--accent)" }}>Loading events...</div>
      )}
      {renderEventForm()}
    </section>
  );
}

export default EventsPage;
