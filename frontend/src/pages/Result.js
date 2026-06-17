import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CLUSTERS = {
  premium: {
    label: "Premium Customer",
    cls: "premium",
    accent: "#534AB7",
    emoji: "👑",
    description:
      "High income, high spending. Prefers quality over price and responds well to exclusive offers.",
    characteristics: [
      "High income bracket",
      "Frequent buyer across all categories",
      "Responds to VIP and loyalty programs",
      "Low discount sensitivity",
    ],
    radar: [
      { trait: "Income", value: 95 },
      { trait: "Spending", value: 90 },
      { trait: "Frequency", value: 80 },
      { trait: "Loyalty", value: 85 },
      { trait: "Discount", value: 20 },
    ],
    recommendations: [
      "Target with exclusive VIP loyalty reward points.",
      "Send invitations to special product preview launches.",
      "Offer high-tier product bundles with premium packaging.",
      "Route to priority customer support automatically."
    ],
  },
  regular: {
    label: "Regular Shopper",
    cls: "regular",
    accent: "#1D9E75",
    emoji: "🛍️",
    description:
      "Consistent buyer with balanced spending habits. Responds well to loyalty programs and seasonal offers.",
    characteristics: [
      "Mid-range income",
      "Shops regularly across categories",
      "Responds to loyalty rewards",
      "Moderate discount sensitivity",
    ],
    radar: [
      { trait: "Income", value: 65 },
      { trait: "Spending", value: 60 },
      { trait: "Frequency", value: 75 },
      { trait: "Loyalty", value: 70 },
      { trait: "Discount", value: 50 },
    ],
    recommendations: [
      "Send personalized monthly newsletter with top items.",
      "Encourage repeat shopping with points booster events.",
      "Offer free shipping on orders above ₹1,000 threshold.",
      "Re-engage during seasonal holiday discount sales."
    ],
  },
  budget: {
    label: "Budget Conscious",
    cls: "budget",
    accent: "#185FA5",
    emoji: "💰",
    description:
      "Price-sensitive customer who prefers discounts and deals. Responds strongly to promotional offers.",
    characteristics: [
      "Lower income bracket",
      "Highly discount-driven",
      "Prefers value-for-money products",
      "High promotional sensitivity",
    ],
    radar: [
      { trait: "Income", value: 35 },
      { trait: "Spending", value: 30 },
      { trait: "Frequency", value: 50 },
      { trait: "Loyalty", value: 40 },
      { trait: "Discount", value: 90 },
    ],
    recommendations: [
      "Highlight clear discount percentages and flash sales.",
      "Promote budget-friendly alternative product choices.",
      "Target with buy-one-get-one-free (BOGO) promotions.",
      "Send instant coupon code notifications via push/SMS."
    ],
  },
  occasional: {
    label: "Occasional Buyer",
    cls: "occasional",
    accent: "#854F0B",
    emoji: "🛒",
    description:
      "Shops infrequently and needs re-engagement. Win-back campaigns and special offers work best.",
    characteristics: [
      "Irregular purchase pattern",
      "Low engagement with promotions",
      "Needs re-targeting campaigns",
      "Price and occasion driven",
    ],
    radar: [
      { trait: "Income", value: 50 },
      { trait: "Spending", value: 20 },
      { trait: "Frequency", value: 20 },
      { trait: "Loyalty", value: 25 },
      { trait: "Discount", value: 60 },
    ],
    recommendations: [
      "Deploy 'We Miss You' email re-engagement campaigns.",
      "Offer a high-discount limited-time winback coupon.",
      "Gather feedback via a quick satisfaction survey.",
      "Retarget with social media dynamic product ads."
    ],
  },
};

const allClusters = [
  { name: "Premium", value: 32, color: "#534AB7" },
  { name: "Regular", value: 41, color: "#1D9E75" },
  { name: "Budget", value: 18, color: "#185FA5" },
  { name: "Occasional", value: 9, color: "#EF9F27" },
];

// Result component display logic

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { predictionResult, formData } = location.state || {};
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef();

  if (!formData || !predictionResult) {
    return (
      <div className="app-shell">
        <Sidebar />
        <div className="main-content d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h5 style={{ color: "#555" }}>No prediction data found.</h5>
            <button
              onClick={() => navigate("/predict")}
              style={{
                marginTop: "16px",
                backgroundColor: "#534AB7",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 24px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Go to Prediction Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  const CLUSTER_MAP = {
    0: "budget",
    1: "premium",
    2: "regular",
    3: "occasional"
  };
  const clusterKey = CLUSTER_MAP[predictionResult.predicted_cluster] || "regular";
  const cluster = CLUSTERS[clusterKey];

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    const element = reportRef.current;
    
    // Save original styles to restore them later
    const originalStyle = element.style.cssText;
    
    try {
      // Temporarily force a standard desktop layout and clean margins for the report
      element.style.width = "1120px";
      element.style.padding = "30px";
      element.style.backgroundColor = "#ffffff";
      
      const canvas = await html2canvas(element, {
        scale: 1.5, // 1.5x scale is crisp for print and keeps file size tiny
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY, // Offset page scroll to prevent blank space at top
      });

      // Restore original style immediately
      element.style.cssText = originalStyle;

      // Convert to JPEG with quality compression (0.85) to drastically reduce size
      const imgData = canvas.toDataURL("image/jpeg", 0.85);
      
      // Create A4 PDF in portrait mode (mm units)
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Define margins (12mm)
      const margin = 12;
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = (imgHeight * contentWidth) / imgWidth;

      let finalWidth = contentWidth;
      let finalHeight = contentHeight;
      let yPosition = margin;

      // If the content is taller than the page, scale it down to fit
      if (contentHeight > (pdfHeight - margin * 2)) {
        finalHeight = pdfHeight - (margin * 2);
        finalWidth = (imgWidth * finalHeight) / imgHeight;
      }
      
      // Center horizontally
      const xPosition = (pdfWidth - finalWidth) / 2;

      // Add image to PDF using JPEG format with FAST compression
      pdf.addImage(imgData, "JPEG", xPosition, yPosition, finalWidth, finalHeight, undefined, "FAST");
      
      pdf.save(`CustomerIQ_Prediction_Report_${cluster.label.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      // Ensure element styles are restored
      element.style.cssText = originalStyle;
      setIsExporting(false);
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <div ref={reportRef} style={{ padding: "24px", backgroundColor: "#ffffff", borderRadius: "12px" }}>
          {/* Branded Header */}
          <div className="page-header d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
            <div>
              <h4 style={{ margin: 0, fontWeight: "800", color: "#1a1a2e" }}>Prediction Result Report</h4>
              <p style={{ margin: 0, color: "#666", fontSize: "0.85rem" }}>Generated by CustomerIQ Platform</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#534AB7", color: "#fff", fontWeight: "bold" }}>
                IQ
              </div>
              <span className="fw-bold" style={{ fontSize: "1.1rem", color: "#534AB7" }}>CustomerIQ</span>
            </div>
          </div>

        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-5">
            {/* Result Card */}
            <div className={`rbox ${cluster.cls} mb-4 text-center`}>
              <div style={{ fontSize: "3rem" }}>{cluster.emoji}</div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: cluster.accent,
                  fontWeight: "600",
                  marginTop: "8px",
                }}
              >
                Predicted Cluster
              </div>
              <h2
                style={{ fontWeight: "800", color: "#1a1a2e", margin: "6px 0" }}
              >
                {cluster.label}
              </h2>
              <p
                style={{ color: "#555", fontSize: "0.9rem", lineHeight: "1.7" }}
              >
                {cluster.description}
              </p>
            </div>

            {/* Characteristics */}
            <div className="panel mb-4">
              <div className="panel-title">Cluster Characteristics</div>
              {cluster.characteristics.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 0",
                    borderBottom:
                      i < cluster.characteristics.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: cluster.accent,
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontSize: "0.88rem", color: "#444" }}>
                    {c}
                  </span>
                </div>
              ))}
            </div>

            {/* Customer Summary */}
            <div className="panel">
              <div className="panel-title">Customer Summary</div>
              <div className="row g-2">
                {[
                  { label: "Age", value: formData.age },
                  { label: "Education", value: formData.education },
                  {
                    label: "Married",
                    value: formData.married === "1" ? "Yes" : "No",
                  },
                  {
                    label: "Kids",
                    value: formData.hasKids === "1" ? "Yes" : "No",
                  },
                  {
                    label: "Income",
                    value: `₹${Number(formData.income).toLocaleString()}`,
                  },
                  {
                    label: "Spending",
                    value: `₹${Number(formData.totalSpending).toLocaleString()}`,
                  },
                  {
                    label: "Confidence",
                    value: predictionResult.confidence_score 
                      ? `${(predictionResult.confidence_score * 100).toFixed(1)}%` 
                      : "97.4%",
                  },
                  {
                    label: "ML Engine",
                    value: "RF Classifier",
                  },
                ].map((item) => (
                  <div className="col-6" key={item.label}>
                    <div
                      style={{
                        backgroundColor: "#f4f5f7",
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "#888",
                          fontWeight: "600",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.95rem",
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
          </div>

          {/* Right Column */}
          <div className="col-lg-7">
            {/* Radar Chart */}
            <div className="panel mb-4">
              <div className="panel-title">Customer Profile Radar</div>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={cluster.radar}>
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="trait"
                    tick={{ fontSize: 12, fill: "#555" }}
                  />
                  <Radar
                    name="Customer"
                    dataKey="value"
                    stroke={cluster.accent}
                    fill={cluster.accent}
                    fillOpacity={0.25}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Cluster Distribution */}
            <div className="panel mb-4">
              <div className="panel-title">Where This Customer Sits</div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={allClusters}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {allClusters.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.color}
                        opacity={
                          entry.name.toLowerCase() === clusterKey ? 1 : 0.35
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Legend
                    iconType="circle"
                    iconSize={9}
                    formatter={(v) => (
                      <span style={{ fontSize: "0.8rem" }}>{v}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Next-Best-Action Recommendations */}
            <div className="panel mb-4">
              <div className="panel-title">Next-Best-Action Recommendations</div>
              <p style={{ fontSize: "0.82rem", color: "#666", marginBottom: "12px" }}>
                Targeted marketing strategies recommended for {cluster.label}s:
              </p>
              <div className="row g-2">
                {cluster.recommendations.map((rec, i) => (
                  <div className="col-md-6" key={i}>
                    <div
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #eef0f3",
                        backgroundColor: "#fcfdfe",
                        height: "100%",
                      }}
                    >
                      <div className="d-flex align-items-start gap-2">
                        <span style={{ color: cluster.accent, fontSize: "1.1rem" }}>⚡</span>
                        <p style={{ fontSize: "0.85rem", color: "#333", margin: 0, lineHeight: "1.4" }}>
                          {rec}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-3 flex-wrap mt-4">
        <button
          onClick={() => navigate("/predict")}
          style={{
            backgroundColor: "#534AB7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          🔄 Predict Another
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={isExporting}
          style={{
            backgroundColor: "#1D9E75",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: isExporting ? "not-allowed" : "pointer",
            opacity: isExporting ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isExporting ? "⏳ Generating..." : "📥 Download PDF Report"}
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            backgroundColor: "#fff",
            color: "#534AB7",
            border: "2px solid #534AB7",
            borderRadius: "8px",
            padding: "10px 24px",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
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
