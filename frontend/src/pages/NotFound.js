import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

function NotFound() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`landing-wrapper ${theme}-theme`}>
      {/* Background Graphic Effects */}
      <div className="bg-grid-dots"></div>
      <div className="glowing-blob-left"></div>
      <div className="glowing-blob-right"></div>
      
      {/* Dynamic Star/Orbit Elements */}
      <div className="accent-circle-float" style={{ top: "15%", left: "12%", width: "40px", height: "40px" }}></div>
      <div className="accent-circle-float" style={{ top: "70%", right: "8%", width: "60px", height: "60px", animationDelay: "-2s" }}></div>

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
          </div>
        </div>
      </header>

      {/* Main 404 Hero Section */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", position: "relative", zIndex: 5 }}>
        <div style={{
          background: theme === "light" ? "rgba(255, 255, 255, 0.45)" : "rgba(30, 41, 59, 0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: theme === "light" ? "1px solid rgba(226, 232, 240, 0.8)" : "1px solid rgba(51, 65, 85, 0.5)",
          borderRadius: "24px",
          padding: "48px 32px",
          textAlign: "center",
          maxWidth: "580px",
          boxShadow: theme === "light" ? "0 20px 40px -15px rgba(0,0,0,0.05)" : "0 20px 40px -15px rgba(0,0,0,0.3)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Cosmic Scanner SVG Illustration */}
          <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto 24px" }}>
            <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Pulsing Ring */}
              <circle cx="80" cy="80" r="75" stroke="var(--brand-primary)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.4" style={{ transformOrigin: "80px 80px", animation: "spinClockwise 40s linear infinite" }} />
              {/* Radar Sweep Ring */}
              <circle cx="80" cy="80" r="55" stroke="var(--brand-primary)" strokeWidth="1" opacity="0.2" />
              <circle cx="80" cy="80" r="35" stroke="var(--brand-primary)" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.6" style={{ transformOrigin: "80px 80px", animation: "spinCounterClockwise 15s linear infinite" }} />
              
              {/* Radar Sweeper Line */}
              <line x1="80" y1="80" x2="80" y2="10" stroke="url(#radarGradient)" strokeWidth="2.5" strokeLinecap="round" style={{ transformOrigin: "80px 80px", animation: "spinClockwise 4s linear infinite" }} />
              
              {/* Core Pulse */}
              <circle cx="80" cy="80" r="8" fill="var(--brand-primary)" style={{ animation: "pulseDot 2s infinite ease-in-out" }} />
              <circle cx="80" cy="80" r="16" stroke="var(--brand-primary)" strokeWidth="1" style={{ transformOrigin: "80px 80px", animation: "ripple 2s infinite cubic-bezier(0.16, 1, 0.3, 1)" }} />
              
              {/* Floating Signal Dots (Targets) */}
              <circle cx="45" cy="55" r="3" fill="#10b981" style={{ animation: "fadeDot 3s infinite ease-in-out" }} />
              <circle cx="115" cy="105" r="2.5" fill="#f59e0b" style={{ animation: "fadeDot 3.8s infinite ease-in-out", animationDelay: "1s" }} />
              <circle cx="105" cy="45" r="2" fill="#ef4444" style={{ animation: "fadeDot 2.5s infinite ease-in-out", animationDelay: "0.5s" }} />

              {/* Definitions */}
              <defs>
                <linearGradient id="radarGradient" x1="80" y1="80" x2="80" y2="10" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Styled CSS Animations */}
          <style>{`
            @keyframes spinClockwise {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spinCounterClockwise {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            @keyframes pulseDot {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.2); opacity: 0.8; }
            }
            @keyframes ripple {
              0% { transform: scale(0.6); opacity: 1; }
              100% { transform: scale(2.2); opacity: 0; }
            }
            @keyframes fadeDot {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.1); }
            }
            @keyframes pulseText {
              0%, 100% { transform: scale(1); opacity: 0.95; }
              50% { transform: scale(1.02); opacity: 1; }
            }
          `}</style>

          {/* Animated 404 Text Gradient */}
          <div style={{
            fontSize: "6.5rem",
            fontWeight: "900",
            lineHeight: "1",
            marginBottom: "12px",
            background: "linear-gradient(135deg, var(--brand-primary) 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.05em",
            animation: "pulseText 3s infinite ease-in-out"
          }}>
            404
          </div>
          
          <h1 style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Lost in Space?
          </h1>
          
          <p style={{ color: "var(--text-sub)", fontSize: "1rem", lineHeight: "1.6", marginBottom: "36px", maxWidth: "440px", margin: "0 auto 36px" }}>
            We scanned the entire galaxy, but the page you are looking for has drifted out of orbit or was never created. Let's guide you back.
          </p>

          <div className="hero-cta-group" style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <button className="cta-primary" onClick={() => navigate("/")} style={{ padding: "12px 28px", fontSize: "0.95rem" }}>
              Back to Safety
            </button>
            <Link className="cta-secondary" to="/dashboard" style={{ fontSize: "0.95rem" }}>
              Visit Dashboard
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer" style={{ padding: "30px 24px" }}>
        <div className="footer-bottom-layout">
          <div>
            © {new Date().getFullYear()} CustomerIQ. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link className="footer-bottom-link" to="/privacy-policy">Privacy Policy</Link>
            <Link className="footer-bottom-link" to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NotFound;
