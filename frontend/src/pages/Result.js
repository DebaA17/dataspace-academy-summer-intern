import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, predictionResult } = location.state || {};

  // Cluster descriptions
  const clusterInfo = {
    0: {
      title: "Budget Conscious",
      color: "#e8f0fe",
      accent: "#1a73e8",
      emoji: "💰",
      description:
        "This customer is price-sensitive and prefers discounts. They spend moderately and respond well to promotional offers.",
      tips: [
        "Offer loyalty discounts",
        "Send promotional emails",
        "Bundle deals work well",
      ],
    },
    1: {
      title: "High Spender",
      color: "#fff3e0",
      accent: "#ff6d00",
      emoji: "💎",
      description:
        "This customer spends heavily on premium products. They have high income and prefer quality over price.",
      tips: [
        "Offer premium products",
        "Exclusive membership perks",
        "Personalized recommendations",
      ],
    },
    2: {
      title: "Moderate Spender",
      color: "#e8f5e9",
      accent: "#2e7d32",
      emoji: "🛍️",
      description:
        "This customer has balanced spending habits. They shop across categories and respond to targeted campaigns.",
      tips: ["Cross-sell products", "Seasonal campaigns", "Email newsletters"],
    },
    3: {
      title: "Occasional Buyer",
      color: "#fce4ec",
      accent: "#c62828",
      emoji: "🛒",
      description:
        "This customer shops occasionally and needs engagement. Re-targeting campaigns can help increase their activity.",
      tips: [
        "Re-engagement campaigns",
        "Special occasion offers",
        "Reminder notifications",
      ],
    },
  };

  // Simple mock prediction based on income and spending
  // (Real prediction will come from your backend ML model)
  const getMockCluster = (data) => {
    const income = parseFloat(data?.income || 0);
    const spending = parseFloat(data?.totalSpending || 0);
    if (income > 70000 && spending > 1000) return 1;
    if (income > 40000 && spending > 500) return 2;
    if (spending < 200) return 3;
    return 0;
  };

  const clusterNumber = getMockCluster(formData);
  const cluster = clusterInfo[clusterNumber];
  const backendResult = predictionResult || null;

  // If someone visits /result directly without form data
  if (!formData) {
    return (
      <div className="page-wrapper result-empty-state text-center mt-5">
        <h4 className="result-empty-state__title">
          No data found. Please fill the form first.
        </h4>
        <button
          className="btn mt-3 primary-action-button"
          onClick={() => navigate("/predict")}
        >
          Go to Form
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper page-wrapper--subtle">
      <div className="container result-shell" style={{ maxWidth: "780px" }}>
        {/* Header */}
        <div className="text-center mb-4 result-header">
          <h2 className="result-header__title">
            Prediction Result
          </h2>
          <p className="result-header__copy">Based on the customer data provided</p>
        </div>

        {/* Main Result Card */}
        <div
          className="rounded-4 p-5 mb-4 text-center shadow-sm result-hero-card"
          style={{
            backgroundColor: cluster.color,
            border: `2px solid ${cluster.accent}`,
          }}
        >
          <div className="result-hero-card__emoji">{cluster.emoji}</div>
          <h6 className="mt-2 result-hero-card__label">
            Customer is in
          </h6>
          <h1 className="result-hero-card__cluster">
            {backendResult ? `Cluster ${backendResult.predicted_cluster}` : `Cluster ${clusterNumber}`}
          </h1>
          <h4 className="mt-1 result-hero-card__title">
            {backendResult ? backendResult.cluster_description : cluster.title}
          </h4>
          <p className="mt-3 mx-auto result-hero-card__copy">
            {backendResult ? backendResult.message : cluster.description}
          </p>
          {backendResult ? (
            <p className="mt-3 mb-0 result-hero-card__confidence">
              Confidence: {(backendResult.confidence_score * 100).toFixed(0)}%
            </p>
          ) : null}
        </div>

        {/* Tips Card */}
        <div className="rounded-4 p-4 mb-4 shadow-sm result-panel">
          <h5 className="result-panel__title">
            📌 Recommended Marketing Actions
          </h5>
          <ul className="mt-3 result-panel__list">
            {cluster.tips.map((tip, index) => (
              <li
                key={index}
                className="mb-2 result-panel__item"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Summary Card */}
        <div className="rounded-4 p-4 mb-4 shadow-sm result-panel">
          <h5 className="result-panel__title">
            📋 Customer Summary
          </h5>
          <div className="row mt-3 g-3">
            {[
              { label: "Age", value: formData.age },
              { label: "Education", value: formData.education },
              {
                label: "Married",
                value: formData.married === "1" ? "Yes" : "No",
              },
              {
                label: "Has Kids",
                value: formData.hasKids === "1" ? "Yes" : "No",
              },
              {
                label: "Income",
                value: `$${Number(formData.income).toLocaleString()}`,
              },
              {
                label: "Total Spending",
                value: `$${Number(formData.totalSpending).toLocaleString()}`,
              },
              { label: "Days as Customer", value: formData.daysCustomer },
              { label: "Children", value: formData.numChildren },
            ].map((item) => (
              <div className="col-6 col-md-3" key={item.label}>
                <div
                  className="p-3 rounded-3 text-center result-summary-card"
                >
                  <div className="result-summary-card__label">
                    {item.label}
                  </div>
                  <div className="result-summary-card__value">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-3 justify-content-center mb-5 flex-wrap result-actions">
          <button
            className="btn px-4 py-2 primary-action-button"
            onClick={() => navigate("/predict")}
          >
            🔄 Predict Another Customer
          </button>
          <button
            className="btn px-4 py-2 secondary-action-button"
            onClick={() => navigate("/")}
          >
            🏠 Back to Home
          </button>
        </div>

        {/* Footer Section */}
        <footer className="container mt-5 pt-4 pb-4 border-top">
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
    </div>
  );
}

export default Result;
