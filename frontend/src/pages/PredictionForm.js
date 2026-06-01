import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PredictionForm() {
  const navigate = useNavigate();
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
    // Navigate to result page with form data
    navigate("/result", { state: { formData } });
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
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: "780px" }}>
        {/* Header */}
        <div className="mb-4">
          <h2 style={{ fontWeight: "800", color: "#1a1a2e" }}>
            Customer Segmentation
          </h2>
          <p style={{ color: "#555" }}>
            Fill in the customer details below to predict their cluster.
          </p>
          <hr />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal Info */}
          <h5 className="mb-3" style={{ color: "#1a73e8", fontWeight: "700" }}>
            👤 Personal Information
          </h5>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label style={labelStyle}>Age</label>
              <input
                type="number"
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
                className="form-control"
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
          <h5 className="mb-3" style={{ color: "#1a73e8", fontWeight: "700" }}>
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
                  className="form-control"
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
          <h5 className="mb-3" style={{ color: "#1a73e8", fontWeight: "700" }}>
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
                  className="form-control"
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
              className="btn px-5 py-3"
              style={{
                backgroundColor: "#1a73e8",
                color: "white",
                fontWeight: "700",
                fontSize: "1.1rem",
                borderRadius: "8px",
                border: "none",
                minWidth: "260px",
              }}
            >
              🔍 Predict Customer Cluster
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PredictionForm;
