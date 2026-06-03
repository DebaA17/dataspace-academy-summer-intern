import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <div className={`landing-wrapper ${theme}-theme`}>
      {/* Background Graphic Effects */}
      <div className="bg-grid-dots"></div>
      <div className="glowing-blob-left"></div>
      <div className="glowing-blob-right"></div>
      <div className="accent-circle-float"></div>
      <div className="dots-pattern-top-left"></div>

      {/* Header / Navbar */}
      <header className="landing-header">
        <div className="header-container">
          <Link className="brand-wrapper" to="/">
            <div className="brand-logo-container">
              {/* Sleek Custom SVG Logo */}
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

          {/* Navigation Links */}
          <nav className="landing-nav">
            <Link className="nav-link-item active" to="/">
              Home
            </Link>
            <a className="nav-link-item" href="#features">
              Features
            </a>
            <a className="nav-link-item" href="#solutions">
              Solutions
            </a>
            <a className="nav-link-item" href="#pricing">
              Pricing
            </a>
            <a className="nav-link-item" href="#resources">
              Resources <span className="nav-dropdown-icon">▼</span>
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            {/* Toggle Theme Button (Sun / Moon) */}
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
            <Link className="signin-link" to="/login">
              Sign in
            </Link>
            <button className="get-started-btn" onClick={() => navigate("/predict")}>
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-wrapper">
        {/* Pill Badge */}
        <div className="hero-pill-badge">
          {/* Sparkle Icon */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
          AI-Powered Customer Intelligence
        </div>

        {/* Title */}
        <h1 className="hero-title-text">
          Know your customer before they <br />
          reach the <span className="hero-title-highlight">billing counter</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-description-text">
          CustomerIQ connects to your billing system, automatically segments every customer
          using machine learning, and triggers the right marketing action in under 1 second.
        </p>

        {/* CTAs */}
        <div className="hero-cta-group">
          <button className="cta-primary" onClick={() => navigate("/predict")}>
            Get started free
          </button>
          <Link className="cta-secondary" to="/dashboard">
            View demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Features Grid Section */}
      <section className="features-section-container" id="features">
        <div className="features-grid-layout">
          {/* Feature Card 1 */}
          <div className="feature-info-card">
            <div className="feature-icon-wrapper">
              {/* Brain Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
              </svg>
            </div>
            <div className="feature-card-content">
              <h3 className="feature-card-title">ML prediction</h3>
              <p className="feature-card-desc">
                Segments customers in under 1 second at checkout
              </p>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="feature-info-card">
            <div className="feature-icon-wrapper">
              {/* Users Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="feature-card-content">
              <h3 className="feature-card-title">4 smart segments</h3>
              <p className="feature-card-desc">
                Premium, Regular, Budget, Occasional — auto-detected
              </p>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="feature-info-card">
            <div className="feature-icon-wrapper">
              {/* Paper Plane Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <div className="feature-card-content">
              <h3 className="feature-card-title">Auto campaigns</h3>
              <p className="feature-card-desc">
                Right SMS to right customer, automatically triggered
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="landing-footer">
        <div className="footer-top-layout">
          {/* Brand Column */}
          <div className="footer-brand-column">
            <Link className="brand-wrapper" to="/">
              <div className="brand-logo-container">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="#4f46e5"/>
                  <rect x="7" y="16" width="4" height="8" rx="1.5" fill="white"/>
                  <rect x="14" y="11" width="4" height="13" rx="1.5" fill="white"/>
                  <rect x="21" y="7" width="4" height="17" rx="1.5" fill="white"/>
                  <circle cx="23" cy="7" r="2" fill="#a78bfa"/>
                </svg>
              </div>
              <span className="brand-text">CustomerIQ</span>
            </Link>
            <p className="footer-brand-desc">
              AI-powered customer intelligence platform that helps businesses understand, segment, and engage customers smarter.
            </p>
            <div className="social-links-row">
              <a href="/" className="social-link-icon-box" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="/" className="social-link-icon-box" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="/" className="social-link-icon-box" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="/" className="social-link-icon-box" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>

          {/* Stay Updated Column */}
          <div className="footer-subscribe-column">
            <h4 className="footer-column-heading">Stay updated</h4>
            <p className="subscribe-description">
              Subscribe to our newsletter for the latest insights and product updates.
            </p>
            {subscribed ? (
              <p style={{ color: "var(--brand-primary)", fontWeight: "600", fontSize: "0.88rem", margin: "10px 0 0" }}>
                ✓ Subscribed successfully!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-subscribe-form">
                <input type="email" placeholder="Enter your email" className="newsletter-email-input" required />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-layout">
          <div>
            © {new Date().getFullYear()} CustomerIQ. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <span style={{ color: "rgba(226, 232, 240, 0.6)" }}>·</span>
            <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
