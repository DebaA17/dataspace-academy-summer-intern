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
              AI Powered Analysis
            </span>
            <h1 className="hero-title">
              Customer Intelligence <span className="hero-highlight">Analysis</span> & Segmentation
            </h1>
            <p className="mt-3 hero-copy">
              Enter your customer's demographic and purchase data to instantly
              predict which customer segment they belong to using our trained ML
              model.
            </p>
            <button
              className="btn mt-4 px-5 py-3 hero-cta"
              onClick={() => navigate("/predict")}
            >
              Get Started →
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
    </div>
  );
}

export default Home;
