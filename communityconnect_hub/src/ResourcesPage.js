// === DESIGN AUDIT ===
// ResourcesPage provides a directory of quick-access cards, organized into sections.
// - Color palette: Dark background, secondary color (red) and accent (white) for all elements.
// - Spacing: Card and section spacing is ample, matches design notes.
// - Typography: Headers, resource names, and contact info have correct hierarchy and scale.
// - Navigation: Tabbing through sections/cards works, input has proper ARIA and labeling.
// - Accessibility: ARIA descriptors, focusable elements, readable text, link contrast on resource names with external link icon.
// - Responsive: Wraps cards and text well for various screen sizes.
// TODO for polish:
//   - Add visually hidden section landmarks (e.g. role="region"/aria-labelledby) for improved navigation.
//   - Improve focus outline on resource cards (CSS).
//   - Possibly animate appearance or hover/focus states for cards.
//   - Ensure Live region or update for appearances if filled/dynamic in future.
//   - Test with high-contrast and screen reader.

import React from "react";

// PUBLIC_INTERFACE
/**
 * ResourcesPage for CommunityConnect Hub - Chennai Edition
 * Organized directory of important resources, support, and helplines for Chennai.
 * All data is demo/sample unless marked as sourced.
 * Props:
 *  - searchQuery: (String) Controlled value for search input.
 *  - setSearchQuery: (Function) Callback for search input.
 *
 * Accessible, dark-themed, and responsive.
 */
function ResourcesPage({ searchQuery, setSearchQuery }) {
  // Data structure: Each resource section contains array of entries
  // Source: Demo/sample compiled from government/NGO public directories and Chennai portals
  const resourceSections = [
    {
      key: "emergency",
      title: "Emergency Contacts (Chennai)",
      emoji: "🚨",
      description: "Immediate help and city-wide emergency numbers.",
      resources: [
        { name: "Police", contact: "100", desc: "Chennai City Police Emergency", type: "Emergency" },
        { name: "Fire & Rescue", contact: "101", desc: "Chennai Fire Department", type: "Emergency" },
        { name: "Ambulance", contact: "108", desc: "Free Ambulance Service (Govt. of Tamil Nadu)", type: "Emergency" },
        { name: "Disaster Management / Flood Helpdesk", contact: "1070", desc: "TN State Disaster Helpline", type: "Government" },
        { name: "Childline", contact: "1098", desc: "24x7 helpline for children in need of care/assistance", type: "Children" },
      ]
    },
    {
      key: "health",
      title: "Healthcare & Hospitals",
      emoji: "🏥",
      description: "Major government and emergency hospitals in Chennai.",
      resources: [
        { name: "Government General Hospital (Rajiv Gandhi GH)", contact: "044-25305000", desc: "Park Town, Chennai", link: "https://tnhealth.tn.gov.in/" },
        { name: "Stanley Medical College Hospital", contact: "044-25281347", desc: "Washermanpet, Chennai" },
        { name: "Kilpauk Medical College Hospital", contact: "044-28364951", desc: "Kilpauk, Chennai" },
        { name: "Chennai Corporation Health Helpline", contact: "1913", desc: "Public health and sanitation helpline (GCC)" },
      ]
    },
    {
      key: "food",
      title: "Food Banks & Kitchens",
      emoji: "🍲",
      description: "Find free or subsidized food through these resources.",
      resources: [
        { name: "Akshaya Patra Kitchen (Chennai)", contact: "1800 425 8622", desc: "NGO Mid-day meals and hunger relief", link: "https://www.akshayapatra.org" },
        { name: "Greater Chennai Corporation - Amma Unavagam", contact: "1913", desc: "Subsidized meals, >500 outlets citywide" },
        { name: "Community Food Banking Network", contact: "7299172668", desc: "Distribution for the needy (network)" },
      ]
    },
    {
      key: "ngo",
      title: "Community & NGO Support",
      emoji: "🤝",
      description: "Organizations providing social, legal, disaster and outreach assistance.",
      resources: [
        { name: "The Banyan", contact: "94443 53434", desc: "Mental health, rescue & shelter services", link: "https://thebanyan.org" },
        { name: "Bhumi", contact: "044-4340 4848", desc: "Youth Volunteer Organization", link: "https://www.bhumi.ngo" },
        { name: "IRCDUC (Chennai)", contact: "91766 13551", desc: "Urban poor, housing and child care advocacy" },
      ]
    },
    {
      key: "shelter",
      title: "Shelters & Relief Centers",
      emoji: "🏠",
      description: "Find temporary accommodation during emergencies. Call ahead to confirm availability.",
      resources: [
        { name: "Chennai Corporation Night Shelter (T Nagar)", contact: "1913", desc: "Available for urban homeless", link: "https://chennaicorporation.gov.in" },
        { name: "Chennai Corporation Night Shelter (Triplicane)", contact: "1913", desc: "Women's night shelter" },
        { name: "Arasan Trust Shelter", contact: "9444048572", desc: "Emergency shelter services, Perambur" },
      ]
    },
    {
      key: "govt",
      title: "Government Sevai & Utilities Services",
      emoji: "🏛️",
      description: "Support for essential government and civic services.",
      resources: [
        { name: "Greater Chennai Corporation (Main)", contact: "1913", desc: "All civic queries, public health, COVID, waste", link: "https://chennaicorporation.gov.in" },
        { name: "Aavin Milk Complaint", contact: "044-23464588", desc: "Milk distribution, supply complaints" },
        { name: "EB (TANGEDCO) Electricity Complaints", contact: "1912", desc: "Power supply faults, complaints" },
        { name: "CM Cell Grievance", contact: "1100", desc: "Tamil Nadu Chief Minister's Cell grievances" },
      ]
    },
    {
      key: "women",
      title: "Women's Helplines & Support",
      emoji: "🧕",
      description: "Resources for women's safety and counseling.",
      resources: [
        { name: "Women's Helpline (Police)", contact: "1091", desc: "Immediate police assistance" },
        { name: "Legal Aid for Women", contact: "044-28592828", desc: "Tamil Nadu State Legal Services Authority" },
        { name: "SNEHA Suicide Prevention", contact: "044-24640050", desc: "24x7 emotional support, Chennai", link: "http://www.snehaindia.org" },
      ]
    },
    {
      key: "covid",
      title: "COVID-19 Services (Sample Data)",
      emoji: "🦠",
      description: "Testing, support, and information lines.",
      resources: [
        { name: "COVID-19 GCC Helpline", contact: "044-25384520", desc: "Chennai Corporation COVID Control Room" },
        { name: "TN State COVID Helpline", contact: "104", desc: "24/7 public health COVID queries" },
        { name: "Volunteer Oxygen/Bed Support", contact: "9884754475", desc: "Verified citizen help (sample/demo)" },
      ]
    },
    {
      key: "mental",
      title: "Mental Health Support",
      emoji: "🧠",
      description: "Confidential helplines for mental wellbeing.",
      resources: [
        { name: "SNEHA (Suicide Prevention)", contact: "044-24640050", desc: "Free, confidential support", link: "http://www.snehaindia.org" },
        { name: "The Banyan", contact: "94443 53434", desc: "Psychosocial crisis intervention" },
      ]
    },
    {
      key: "utilities",
      title: "Public Utilities & Essential Services",
      emoji: "💡",
      description: "Report outages, faults, and city emergencies.",
      resources: [
        { name: "Metrowater Helpline", contact: "044-45674567", desc: "Drinking water supply support (CMC)" },
        { name: "Chennai Gas Leak Helpline (IOCL)", contact: "1906", desc: "Emergency LPG Leak" },
      ]
    },
    {
      key: "transport",
      title: "Transport, Rail, Metro & Taxi Helplines",
      emoji: "🚇",
      description: "Helplines relevant for travel within Chennai.",
      resources: [
        { name: "MTC Bus Enquiry", contact: "9445030516", desc: "Chennai Bus Info (MTC customer care)" },
        { name: "Chennai Metro Rail Helpline", contact: "1860 266 1234", desc: "Metro customer help" },
        { name: "Railways (All-India)", contact: "139", desc: "National Railways Passenger Info" },
        { name: "Women-only Taxi (She Taxi)", contact: "9524720084", desc: "Safe cabs for women (demo)" },
        { name: "Traffic Emergency", contact: "103", desc: "Accident/emergency traffic issues" },
      ]
    }
  ];

  // Flatten + filter by search (case-insensitive match on name, contact, desc, type or section title)
  function getFilteredSections(query) {
    if (!query || !query.trim()) return resourceSections;
    const q = query.trim().toLowerCase();
    return resourceSections
      .map(section => {
        const filteredResources = section.resources.filter(res =>
          [
            section.title, section.emoji, res.name, res.contact, res.desc, res.type
          ].join(" ").toLowerCase().includes(q)
        );
        if (filteredResources.length === 0) return null;
        return { ...section, resources: filteredResources };
      })
      .filter(Boolean);
  }
  const sectionsToShow = getFilteredSections(searchQuery);

  // Card rendering helper
  function ResourceCard({ resource }) {
    return (
      <div
        style={{
          background: "#212226",
          border: "1.5px solid var(--border-color)",
          borderLeft: "4px solid var(--secondary)",
          borderRadius: 9,
          padding: "14px 16px 13px 20px",
          minWidth: 210,
          maxWidth: 305,
          marginBottom: "auto",
          color: "var(--accent)",
        }}
        className="resources-card"
        tabIndex={0}
        aria-label={`${resource.name} (${resource.contact})`}
      >
        <div style={{ fontWeight: 700, fontSize: "1.07em", color: "var(--secondary)", marginBottom: 1 }}>
          {resource.name}
          {resource.link &&
            <a href={resource.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 7, color: "var(--accent)", fontSize: 16, textDecoration: "underline" }} aria-label="External resource (opens in new tab)">
              ↗
            </a>
          }
        </div>
        <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 4 }}>
          {resource.desc}
        </div>
        <div style={{ fontSize: 14 }}>
          <span style={{ fontWeight: 500 }}>Contact:</span>{" "}
          <span style={{ color: "#fff", fontWeight: 600, fontFamily: "monospace" }}>{resource.contact}</span>
        </div>
      </div>
    );
  }

  return (
    <section className="resources-section" id="resources" style={{marginBottom: 24}}>
      <div
        className="centered-resource-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          minHeight: 0,
          margin: "0 auto 20px auto",
        }}
      >
        <h2
          style={{
            margin: "32px 0 8px 0",
            color: "var(--accent)",
            fontWeight: 800,
            fontSize: "2.3rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
            width: "100%",
          }}>
          Community Resources <span role="img" aria-label="Support" style={{fontSize: "1.5em"}}>🌆</span>
        </h2>
        <p
          className="description"
          style={{
            color: "var(--text-secondary)",
            margin: 0,
            marginBottom: 0,
            textAlign: "center",
            background: "rgba(24,24,28,0.9)",
            borderRadius: "12px",
            padding: "20px 16px 15px 16px",
            maxWidth: 730,
            fontSize: "1.15rem",
            boxShadow: "0 2px 18px #0002",
          }}
        >
          Curated directory of public and volunteer resources for Chennai.<br />
          <span style={{ fontSize: ".97em" }}>
            For emergencies dial 100, 101, or 108. Data below is for quick access and not exhaustive.
            <b>
              If you’re missing a resource,
              <a href="/feedback" style={{ color: "var(--secondary)", textDecoration: "underline" }}> let us know</a>.
            </b>
          </span>
        </p>
      </div>
      {/* Search bar */}
      <form
        autoComplete="off"
        onSubmit={e => e.preventDefault()}
        style={{ width: "100%", margin: "0 auto", maxWidth: 450, marginBottom: 16 }}
        role="search"
        aria-label="Search community resources"
      >
        <input
          type="text"
          placeholder="Search by resource name, purpose, phone..."
          aria-label="Search resources"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "13px 18px",
            fontSize: "1.1rem",
            borderRadius: 8,
            border: "1.5px solid var(--secondary)",
            background: "#181818",
            color: "var(--accent)",
            marginBottom: 0,
            marginTop: 2,
            outline: "none"
          }}
        />
      </form>
      {/* Render resource sections */}
      <div style={{display: "flex", flexDirection: "column", gap: 28, marginTop: 2}}>
        {sectionsToShow.length === 0 && (
          <div style={{ color: "var(--text-secondary)", fontSize: 16, fontWeight: 500, background: "#19191c", padding: 21, marginTop: 11, borderRadius: 10 }}>
            No resources found matching your search.
          </div>
        )}
        {sectionsToShow.map(section => (
          <div key={section.key} style={{marginBottom: 0}}>
            <h3
              style={{
                color: "var(--secondary)",
                fontWeight: 800,
                fontSize: "1.30rem",
                margin: "12px 0 2px 0",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
              tabIndex={0}
              aria-label={section.title}
            >
              <span aria-hidden="true">{section.emoji}</span> {section.title}
            </h3>
            <div style={{
              color: "var(--text-secondary)",
              fontSize: 14,
              marginBottom: 8,
              maxWidth: 900
            }}>
              {section.description}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 13,
                marginBottom: 0,
                marginTop: 5,
              }}
              aria-label={`Resource cards for ${section.title}`}>
              {section.resources.map((res, i) => <ResourceCard key={i} resource={res} />)}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 18,
        color: "var(--text-secondary)",
        fontSize: 13,
        textAlign: "center"
      }}>
        For updates and government schemes, check <a href="https://chennaicorporation.gov.in" rel="noopener noreferrer" style={{color: "var(--secondary)"}}>Greater Chennai Corporation</a>. <br />
        <span style={{color: "var(--secondary)"}}>If information is incorrect, please <a href="/feedback" style={{color: "var(--secondary)", textDecoration: "underline"}}>notify us here</a>.</span>
      </div>
      <div style={{
        marginTop: 18,
        color: "#FD0",
        fontWeight: 500,
        fontSize: 13
      }}>
        Note: This is a sample/demo directory &mdash; for emergencies use official government/helpline channels.
      </div>
    </section>
  );
}

export default ResourcesPage;
