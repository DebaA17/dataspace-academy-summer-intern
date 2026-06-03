import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function TermsOfService() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`landing-wrapper ${theme}-theme`}>
      {/* Background graphic elements */}
      <div className="bg-grid-dots"></div>
      <div className="glowing-blob-left"></div>
      <div className="glowing-blob-right"></div>

      {/* Header */}
      <header className="landing-header">
        <div className="header-container">
          <Link className="brand-wrapper" to="/">
            <div className="brand-logo-container">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#4f46e5"/>
                <rect x="7" y="16" width="4" height="8" rx="1.5" fill="white"/>
                <rect x="14" y="11" width="4" height="13" rx="1.5" fill="white"/>
                <rect x="21" y="7" width="4" height="17" rx="1.5" fill="white"/>
                <circle cx="23" cy="7" r="2" fill="#a78bfa"/>
              </svg>
            </div>
            <span className="brand-text">CustomerIQ</span>
          </Link>
          <div className="header-actions">
            <button className="theme-toggle-btn" title="Toggle Theme" aria-label="Toggle Theme" onClick={toggleTheme}>
              {theme === "light" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <Link className="signin-link" to="/dashboard" style={{ fontSize: "0.9rem", fontWeight: "600" }}>
              ← Go to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: "800px", margin: "60px auto 100px", padding: "0 24px", position: "relative", zIndex: 5 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "8px", color: "var(--text-main)", letterSpacing: "-0.02em" }}>
          Terms of Service
        </h1>
        <p style={{ color: "var(--text-sub)", fontSize: "0.925rem", marginBottom: "40px" }}>
          Last Updated: June 3, 2026
        </p>

        <p style={{ color: "var(--text-sub)", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "32px" }}>
          CustomerIQ welcomes you to our demonstration platform. By accessing and using our website, you agree to comply with and be bound by these Terms of Service.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", color: "var(--text-main)" }}>
          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>Use License</h2>
            <ul style={{ color: "var(--text-sub)", lineHeight: "1.8", fontSize: "0.95rem", paddingLeft: "20px" }}>
              <li>The platform is for educational and demonstrative purposes only.</li>
              <li>You may use the prediction simulator to test customer classification models.</li>
              <li>Commercial redistribution or reverse engineering of the classifier parameters is not permitted.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>Disclaimer of Warranty</h2>
            <ul style={{ color: "var(--text-sub)", lineHeight: "1.8", fontSize: "0.95rem", paddingLeft: "20px" }}>
              <li>CustomerIQ is provided "as is" without warranties of any kind.</li>
              <li>The prediction models are demonstrative and should not be used as official financial or business advice.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>Data Submission</h2>
            <p style={{ color: "var(--text-sub)", lineHeight: "1.6", fontSize: "0.95rem" }}>
              Users must not submit real, sensitive personal identification information or confidential business data to the simulation wizard.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>Modifications</h2>
            <p style={{ color: "var(--text-sub)", lineHeight: "1.6", fontSize: "0.95rem" }}>
              We reserve the right to modify these terms, deprecate simulation paths, or update features at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px" }}>Contact</h2>
            <p style={{ color: "var(--text-sub)", lineHeight: "1.6", fontSize: "0.95rem" }}>
              For questions regarding these terms, please contact the project team.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-bottom-layout">
          <div>
            © {new Date().getFullYear()} CustomerIQ. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/" className="footer-bottom-link">Home</Link>
            <span style={{ color: "rgba(226, 232, 240, 0.6)" }}>·</span>
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TermsOfService;
