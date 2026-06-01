import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row align-items-center">
          {/* Left Text */}
          <div className="col-lg-6 mb-4">
            <span
              className="badge mb-3"
              style={{
                backgroundColor: "#e8f0fe",
                color: "#1a73e8",
                fontSize: "14px",
                padding: "8px 14px",
              }}
            >
              AI Powered Analysis
            </span>
            <h1
              style={{
                fontSize: "2.8rem",
                fontWeight: "800",
                color: "#1a1a2e",
                lineHeight: "1.2",
              }}
            >
              Customer Personality{" "}
              <span style={{ color: "#1a73e8" }}>Analysis</span> & Segmentation
            </h1>
            <p
              className="mt-3"
              style={{ fontSize: "1.1rem", color: "#555", lineHeight: "1.8" }}
            >
              Enter your customer's demographic and purchase data to instantly
              predict which customer segment they belong to using our trained ML
              model.
            </p>
            <button
              className="btn mt-4 px-5 py-3"
              style={{
                backgroundColor: "#1a73e8",
                color: "white",
                fontWeight: "600",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
              }}
              onClick={() => navigate("/predict")}
            >
              Get Started →
            </button>
          </div>

          {/* Right Info Cards */}
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6">
                <div
                  className="p-4 rounded-3 text-center"
                  style={{ backgroundColor: "#e8f0fe" }}
                >
                  <div style={{ fontSize: "2rem" }}>🎯</div>
                  <h6 className="mt-2 fw-bold" style={{ color: "#1a73e8" }}>
                    Smart Clustering
                  </h6>
                  <p
                    className="mb-0"
                    style={{ fontSize: "0.85rem", color: "#555" }}
                  >
                    Groups customers by behaviour patterns
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div
                  className="p-4 rounded-3 text-center"
                  style={{ backgroundColor: "#fff3e0" }}
                >
                  <div style={{ fontSize: "2rem" }}>📊</div>
                  <h6 className="mt-2 fw-bold" style={{ color: "#ff6d00" }}>
                    Data Driven
                  </h6>
                  <p
                    className="mb-0"
                    style={{ fontSize: "0.85rem", color: "#555" }}
                  >
                    Based on real transaction data
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div
                  className="p-4 rounded-3 text-center"
                  style={{ backgroundColor: "#e8f5e9" }}
                >
                  <div style={{ fontSize: "2rem" }}>⚡</div>
                  <h6 className="mt-2 fw-bold" style={{ color: "#2e7d32" }}>
                    Instant Results
                  </h6>
                  <p
                    className="mb-0"
                    style={{ fontSize: "0.85rem", color: "#555" }}
                  >
                    Get predictions in seconds
                  </p>
                </div>
              </div>

              <div className="col-6">
                <div
                  className="p-4 rounded-3 text-center"
                  style={{ backgroundColor: "#fce4ec" }}
                >
                  <div style={{ fontSize: "2rem" }}>🤖</div>
                  <h6 className="mt-2 fw-bold" style={{ color: "#c62828" }}>
                    ML Powered
                  </h6>
                  <p
                    className="mb-0"
                    style={{ fontSize: "0.85rem", color: "#555" }}
                  >
                    Trained classification model
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mt-5 pt-4">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#1a1a2e" }}>
          How It Works
        </h2>
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div
              className="p-4 rounded-3 shadow-sm"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="mb-3" style={{ fontSize: "2.5rem" }}>
                📝
              </div>
              <h5 className="fw-bold">Step 1</h5>
              <p style={{ color: "#555" }}>
                Fill in the customer's personal and purchase details in the form
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 rounded-3 shadow-sm"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="mb-3" style={{ fontSize: "2.5rem" }}>
                🧠
              </div>
              <h5 className="fw-bold">Step 2</h5>
              <p style={{ color: "#555" }}>
                Our ML model analyses the data and predicts the cluster
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 rounded-3 shadow-sm"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="mb-3" style={{ fontSize: "2.5rem" }}>
                ✅
              </div>
              <h5 className="fw-bold">Step 3</h5>
              <p style={{ color: "#555" }}>
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
