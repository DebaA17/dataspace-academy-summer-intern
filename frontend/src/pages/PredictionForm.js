import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PredictionForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    age: "",
    education: "",
    married: "",
    hasKids: "",
    numChildren: "",
    income: "",
    totalSpending: "",
    daysCustomer: "",
    amtWines: "",
    amtFruits: "",
    amtMeat: "",
    amtFish: "",
    amtSweets: "",
    amtGold: "",
    numWebPurchases: "",
    numCatalogPurchases: "",
    numStorePurchases: "",
    numDiscountPurchases: "",
    numPromoAccepted: "",
    numWebVisits: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      age: Number(formData.age),
      income: Number(formData.income),
      total_spending: Number(formData.totalSpending),
      education: formData.education,
      marital_status: formData.married === "1" ? "Married" : "Single",
      num_web_purchases: Number(formData.numWebPurchases),
      num_store_purchases: Number(formData.numStorePurchases),
      num_catalog_purchases: Number(formData.numCatalogPurchases),
      num_web_visits_month: Number(formData.numWebVisits),
      recency: Number(formData.daysCustomer),
      total_children: Number(formData.numChildren),
    };

    setLoading(true);
    setError("");

    fetch("/api/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.detail || "Unable to get prediction from backend.");
        }
        navigate("/result", {
          state: {
            formData,
            predictionResult: data,
          },
        });
      })
      .catch((submitError) => {
        setError(submitError.message || "Prediction request failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #d0d7de",
    padding: "10px 14px",
    fontSize: "0.95rem",
    backgroundColor: "#fff",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "6px",
  };

  return (
    <div className="page-wrapper page-wrapper--subtle">
      <div className="container form-shell" style={{ maxWidth: "780px" }}>
        {/* Header */}
        <div className="mb-4 form-header">
          <h2 className="form-header__title">
            Customer Segmentation
          </h2>
          <p className="form-header__copy">
            Fill in the customer details below to predict their cluster.
          </p>
          {error ? (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          ) : null}
          <hr />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal Info */}
          <h5 className="mb-3 form-section-title">
            👤 Personal Information
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label style={labelStyle}>Age</label>
              <input
                type="number"
                className="form-control app-input"
                name="age"
                placeholder="Customer Age"
                value={formData.age}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div className="col-md-6">
              <label style={labelStyle}>Education</label>
              <select
                className="form-control app-input"
                name="education"
                value={formData.education}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Select Education</option>
                <option value="Basic">Basic</option>
                <option value="2n Cycle">2n Cycle</option>
                <option value="Graduation">Graduation</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="col-md-6">
              <label style={labelStyle}>Married</label>
              <select
                className="form-control app-input"
                name="married"
                value={formData.married}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Is Married?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div className="col-md-6">
              <label style={labelStyle}>Has Kids</label>
              <select
                className="form-control app-input"
                name="hasKids"
                value={formData.hasKids}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Has Kids?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            <div className="col-md-6">
              <label style={labelStyle}>Number of Children</label>
              <input
                type="number"
                className="form-control app-input"
                name="numChildren"
                placeholder="No. of Children"
                value={formData.numChildren}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div className="col-md-6">
              <label style={labelStyle}>Income of Customer</label>
              <input
                type="number"
                className="form-control app-input"
                name="income"
                placeholder="Customer Income"
                value={formData.income}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div className="col-md-6">
              <label style={labelStyle}>Total Money Spending</label>
              <input
                type="number"
                className="form-control app-input"
                name="totalSpending"
                placeholder="Total Money Spending"
                value={formData.totalSpending}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div className="col-md-6">
              <label style={labelStyle}>Days of Being Customer</label>
              <input
                type="number"
                className="form-control app-input"
                name="daysCustomer"
                placeholder="Days as Customer"
                value={formData.daysCustomer}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          {/* Section 2: Spending */}
          <h5 className="mb-3 form-section-title">
            🛒 Spending in Last 2 Years
          </h5>
          <div className="row g-3 mb-4">
            {[
              {
                label: "Amount Spent on Wines",
                name: "amtWines",
                placeholder: "Amount on Wines",
              },
              {
                label: "Amount Spent on Fruits",
                name: "amtFruits",
                placeholder: "Amount on Fruits",
              },
              {
                label: "Amount Spent on Meat",
                name: "amtMeat",
                placeholder: "Amount on Meat",
              },
              {
                label: "Amount Spent on Fish",
                name: "amtFish",
                placeholder: "Amount on Fish",
              },
              {
                label: "Amount Spent on Sweets",
                name: "amtSweets",
                placeholder: "Amount on Sweets",
              },
              {
                label: "Amount Spent on Gold",
                name: "amtGold",
                placeholder: "Amount on Gold",
              },
            ].map((field) => (
              <div className="col-md-6" key={field.name}>
                <label style={labelStyle}>{field.label}</label>
                <input
                  type="number"
                  className="form-control app-input"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            ))}
          </div>

          {/* Section 3: Purchase Behaviour */}
          <h5 className="mb-3 form-section-title">
            📦 Purchase Behaviour
          </h5>
          <div className="row g-3 mb-4">
            {[
              {
                label: "Purchases via Website",
                name: "numWebPurchases",
                placeholder: "No. of Web Purchases",
              },
              {
                label: "Purchases via Catalogue",
                name: "numCatalogPurchases",
                placeholder: "No. of Catalogue Purchases",
              },
              {
                label: "Purchases in Store",
                name: "numStorePurchases",
                placeholder: "No. of Store Purchases",
              },
              {
                label: "Purchases with Discount",
                name: "numDiscountPurchases",
                placeholder: "No. of Discount Purchases",
              },
              {
                label: "Promotion Offers Accepted",
                name: "numPromoAccepted",
                placeholder: "No. of Promos Accepted",
              },
              {
                label: "Website Visits Last Month",
                name: "numWebVisits",
                placeholder: "No. of Web Visits",
              },
            ].map((field) => (
              <div className="col-md-6" key={field.name}>
                <label style={labelStyle}>{field.label}</label>
                <input
                  type="number"
                  className="form-control app-input"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4 mb-5">
            <button
              type="submit"
              className="btn px-5 py-3 primary-action-button"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="button-loading" aria-live="polite">
                  <span className="button-spinner" aria-hidden="true" />
                  Predicting...
                </span>
              ) : (
                "🔍 Predict Customer Cluster"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PredictionForm;
