import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper home-page">
      {/* Hero Section */}
      <div className="container hero-section mt-5">
        <div className="row align-items-center hero-grid">
          {/* Left Text */}
          <div className="col-lg-6 mb-4 hero-copy-col">
            <span className="badge mb-3 hero-kicker">
              ⚡ AI Customer Intelligence
            </span>
            <h1 className="hero-title">
              AI-Powered Customer <span className="hero-highlight">Segmentation</span> & Insights
            </h1>
            <p className="mt-3 hero-copy">
              Transform demographic and transactional customer data into actionable business intelligence.
              Predict segments instantly using our trained high-accuracy machine learning classifier.
            </p>
            <button
              className="btn mt-4 px-5 py-3 hero-cta"
              onClick={() => navigate("/predict")}
            >
              Start Analysis →
            </button>
          </div>

          {/* Right Info Cards */}
          <div className="col-lg-6 hero-features-col">
            <div className="row g-3 hero-features-grid">
              <div className="col-6">
                <div className="p-4 rounded-4 text-center feature-card feature-card--blue">
                  <div className="feature-card__icon">🎯</div>
                  <h6 className="mt-2 fw-bold feature-card__title">
                    Smart Clustering
                  </h6>
                  <p className="mb-0 feature-card__text">
                    Groups customers by behaviour patterns
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div className="p-4 rounded-4 text-center feature-card feature-card--amber">
                  <div className="feature-card__icon">📊</div>
                  <h6 className="mt-2 fw-bold feature-card__title">
                    Data Driven
                  </h6>
                  <p className="mb-0 feature-card__text">
                    Based on real transaction data
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div className="p-4 rounded-4 text-center feature-card feature-card--green">
                  <div className="feature-card__icon">⚡</div>
                  <h6 className="mt-2 fw-bold feature-card__title">
                    Instant Results
                  </h6>
                  <p className="mb-0 feature-card__text">
                    Get predictions in seconds
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div className="p-4 rounded-4 text-center feature-card feature-card--rose">
                  <div className="feature-card__icon">🤖</div>
                  <h6 className="mt-2 fw-bold feature-card__title">
                    ML Powered
                  </h6>
                  <p className="mb-0 feature-card__text">
                    Trained classification model
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mt-5 pt-3 stats-section">
        <div className="row g-4 text-center">
          <div className="col-6 col-lg-3">
            <div className="p-4 rounded-4 shadow-sm stats-card" style={{ background: "rgba(255, 255, 255, 0.65)", border: "1px solid rgba(15, 23, 42, 0.06)", backdropFilter: "blur(8px)" }}>
              <div className="display-6 fw-extrabold text-primary mb-1" style={{ fontSize: "2rem", fontWeight: "900" }}>2,240+</div>
              <div className="small text-secondary fw-semibold uppercase-label" style={{ fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Customers Analyzed</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="p-4 rounded-4 shadow-sm stats-card" style={{ background: "rgba(255, 255, 255, 0.65)", border: "1px solid rgba(15, 23, 42, 0.06)", backdropFilter: "blur(8px)" }}>
              <div className="display-6 fw-extrabold text-success mb-1" style={{ fontSize: "2rem", fontWeight: "900", color: "#10b981" }}>98.4%</div>
              <div className="small text-secondary fw-semibold uppercase-label" style={{ fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Model Accuracy</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="p-4 rounded-4 shadow-sm stats-card" style={{ background: "rgba(255, 255, 255, 0.65)", border: "1px solid rgba(15, 23, 42, 0.06)", backdropFilter: "blur(8px)" }}>
              <div className="display-6 fw-extrabold text-info mb-1" style={{ fontSize: "2rem", fontWeight: "900", color: "#06b6d4" }}>4 Dynamic</div>
              <div className="small text-secondary fw-semibold uppercase-label" style={{ fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Customer Segments</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="p-4 rounded-4 shadow-sm stats-card" style={{ background: "rgba(255, 255, 255, 0.65)", border: "1px solid rgba(15, 23, 42, 0.06)", backdropFilter: "blur(8px)" }}>
              <div className="display-6 fw-extrabold text-warning mb-1" style={{ fontSize: "2rem", fontWeight: "900", color: "#f59e0b" }}>12.8k+</div>
              <div className="small text-secondary fw-semibold uppercase-label" style={{ fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Predictions Generated</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mt-5 pt-4 how-it-works-section">
        <h2 className="text-center fw-bold mb-4 section-heading">
          How It Works
        </h2>
        <div className="row g-4 text-center how-it-works-grid">
          <div className="col-md-4">
            <div className="p-4 rounded-4 shadow-sm workflow-card">
              <div className="workflow-card__icon mb-3">📝</div>
              <div className="workflow-card__step">Step 1</div>
              <h5 className="fw-bold workflow-card__title">Collect data</h5>
              <p className="workflow-card__text">
                Fill in the customer's personal and purchase details in the form
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 rounded-4 shadow-sm workflow-card">
              <div className="workflow-card__icon mb-3">🧠</div>
              <div className="workflow-card__step">Step 2</div>
              <h5 className="fw-bold workflow-card__title">Predict segment</h5>
              <p className="workflow-card__text">
                Our ML model analyses the data and predicts the cluster
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 rounded-4 shadow-sm workflow-card">
              <div className="workflow-card__icon mb-3">✅</div>
              <div className="workflow-card__step">Step 3</div>
              <h5 className="fw-bold workflow-card__title">Review insights</h5>
              <p className="workflow-card__text">
                View the customer segment result with a detailed breakdown
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="container mt-5 pt-5 pb-4 border-top">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <div className="brand-badge" style={{ width: "32px", height: "32px", borderRadius: "10px", fontSize: "0.7rem", boxShadow: "none" }}>
              IQ
            </div>
            <span className="fw-bold text-primary" style={{ fontSize: "0.95rem" }}>CustomerIQ</span>
          </div>
          <div className="text-secondary small">
            © {new Date().getFullYear()} CustomerIQ Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
