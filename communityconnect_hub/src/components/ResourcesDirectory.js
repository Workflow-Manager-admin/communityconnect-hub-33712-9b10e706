import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
function ResourcesDirectory() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pretend to fetch resources from backend or indexed list
  useEffect(() => {
    setTimeout(() => {
      setResources([
        {
          name: "Downtown Shelter",
          type: "Shelter",
          contact: "555-1010",
          url: "",
          address: "12 Elm Street",
        },
        {
          name: "Hope Food Bank",
          type: "Food Bank",
          contact: "555-3030",
          url: "",
          address: "456 Oak Avenue",
        },
        {
          name: "Emergency Police",
          type: "Emergency",
          contact: "911",
          url: "",
          address: "",
        },
      ]);
      setLoading(false);
    }, 700);
  }, []);

  return (
    <div>
      <h2 className="cc-section-title">Community Resources</h2>
      <p className="cc-section-desc">
        Directory of community resources, charities, and emergency contacts.
      </p>
      {loading ? (
        <div className="cc-skeleton" style={{ height: 80 }} />
      ) : (
        <table style={{ width: "100%", color: "var(--cc-accent)", fontSize: "1.04rem" }}>
          <thead>
            <tr style={{ color: "var(--cc-secondary)" }}>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Type</th>
              <th style={{ textAlign: "left" }}>Contact</th>
              <th style={{ textAlign: "left" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.type}</td>
                <td>{r.contact}</td>
                <td>{r.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ResourcesDirectory;
