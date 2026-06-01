import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

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

  // If someone visits /result directly without form data
  if (!formData) {
    return (
      <div className="page-wrapper text-center mt-5">
        <h4 style={{ color: "#555" }}>
          No data found. Please fill the form first.
        </h4>
        <button
          className="btn mt-3"
          style={{
            backgroundColor: "#1a73e8",
            color: "white",
            borderRadius: "8px",
          }}
          onClick={() => navigate("/predict")}
        >
          Go to Form
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: "780px" }}>
        {/* Header */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: "800", color: "#1a1a2e" }}>
            Prediction Result
          </h2>
          <p style={{ color: "#555" }}>Based on the customer data provided</p>
        </div>

        {/* Main Result Card */}
        <div
          className="rounded-4 p-5 mb-4 text-center shadow-sm"
          style={{
            backgroundColor: cluster.color,
            border: `2px solid ${cluster.accent}`,
          }}
        >
          <div style={{ fontSize: "4rem" }}>{cluster.emoji}</div>
          <h6
            className="mt-2"
            style={{
              color: cluster.accent,
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            Customer is in
          </h6>
          <h1
            style={{ fontWeight: "900", color: "#1a1a2e", fontSize: "2.5rem" }}
          >
            Cluster {clusterNumber}
          </h1>
          <h4
            className="mt-1"
            style={{ color: cluster.accent, fontWeight: "700" }}
          >
            {cluster.title}
          </h4>
          <p
            className="mt-3 mx-auto"
            style={{ color: "#444", maxWidth: "500px", lineHeight: "1.7" }}
          >
            {cluster.description}
          </p>
        </div>

        {/* Tips Card */}
        <div
          className="rounded-4 p-4 mb-4 shadow-sm"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h5 style={{ fontWeight: "700", color: "#1a1a2e" }}>
            📌 Recommended Marketing Actions
          </h5>
          <ul className="mt-3" style={{ paddingLeft: "20px" }}>
            {cluster.tips.map((tip, index) => (
              <li
                key={index}
                className="mb-2"
                style={{ color: "#555", fontSize: "0.95rem" }}
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Summary Card */}
        <div
          className="rounded-4 p-4 mb-4 shadow-sm"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h5 style={{ fontWeight: "700", color: "#1a1a2e" }}>
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
                  className="p-3 rounded-3 text-center"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      fontWeight: "600",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: "#1a1a2e",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-3 justify-content-center mb-5 flex-wrap">
          <button
            className="btn px-4 py-2"
            style={{
              backgroundColor: "#1a73e8",
              color: "white",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
            }}
            onClick={() => navigate("/predict")}
          >
            🔄 Predict Another Customer
          </button>
          <button
            className="btn px-4 py-2"
            style={{
              backgroundColor: "#ffffff",
              color: "#1a73e8",
              fontWeight: "600",
              borderRadius: "8px",
              border: "2px solid #1a73e8",
            }}
            onClick={() => navigate("/")}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
