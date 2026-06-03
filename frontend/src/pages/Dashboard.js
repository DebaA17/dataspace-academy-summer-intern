import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const colors = {
  Premium: "#534AB7",
  Regular: "#1D9E75",
  Budget: "#185FA5",
  Occasional: "#EF9F27"
};

const ageData = [
  { age: "18-25", customers: 120 },
  { age: "26-35", customers: 340 },
  { age: "36-45", customers: 290 },
  { age: "46-55", customers: 180 },
  { age: "55+", customers: 70 },
];

const revenueData = [
  { name: "Premium", revenue: 48000 },
  { name: "Regular", revenue: 31000 },
  { name: "Budget", revenue: 12000 },
  { name: "Occasional", revenue: 7000 },
];

const spendingData = [
  { range: "0-200", customers: 90 },
  { range: "200-500", customers: 210 },
  { range: "500-1K", customers: 180 },
  { range: "1K-2K", customers: 130 },
  { range: "2K+", customers: 80 },
];

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("authToken")}`
        };
        const [statsRes, segmentsRes] = await Promise.all([
          fetch("/api/dashboard/stats/", { headers }),
          fetch("/api/segments/", { headers })
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
        if (segmentsRes.ok) {
          const segmentsData = await segmentsRes.json();
          setSegments(segmentsData);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const clusterDist = segments.map(s => ({
    name: s.name,
    value: s.percentage,
    color: colors[s.name] || "#ccc"
  }));

  const metricCards = stats ? [
    {
      label: "Total Customers",
      value: stats.total_customers.toLocaleString(),
      trend: `Avg Age: ${stats.avg_age}`,
      up: true,
    },
    {
      label: "Avg Annual Income",
      value: `₹${Math.round(stats.avg_income).toLocaleString()}`,
      trend: "Based on real tax files",
      up: true,
    },
    {
      label: "Model Accuracy",
      value: `${stats.model_accuracy}%`,
      trend: "XGBoost Classification",
      up: true,
    },
    {
      label: "Active Customers",
      value: stats.active_customers.toLocaleString(),
      trend: "Interacted in last 60 days",
      up: true,
    },
  ] : [
    { label: "Total Customers", value: "Loading...", trend: "", up: true },
    { label: "Avg Annual Income", value: "Loading...", trend: "", up: true },
    { label: "Model Accuracy", value: "Loading...", trend: "", up: true },
    { label: "Active Customers", value: "Loading...", trend: "", up: true },
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        {/* Header */}
        <div className="page-header d-flex justify-content-between align-items-center">
          <div>
            <h4>Dashboard</h4>
            <p>Customer segmentation overview</p>
          </div>
          <button
            onClick={() => navigate("/predict")}
            style={{
              backgroundColor: "#534AB7",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "9px 20px",
              fontWeight: "600",
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            + New Prediction
          </button>
        </div>

        {/* Metric Cards */}
        <div className="row g-3 mb-4">
          {metricCards.map((m) => (
            <div className="col-6 col-md-3" key={m.label}>
              <div className="metric-card">
                <div className="label">{m.label}</div>
                <div className="value">{m.value}</div>
                <div className={`trend ${m.up ? "trend-up" : "trend-down"}`}>
                  {m.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="row g-3 mb-4">
          {/* Pie Chart */}
          <div className="col-md-5">
            <div className="panel">
              <div className="panel-title">
                Customer Distribution by Cluster
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={clusterDist}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {clusterDist.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
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
          </div>

          {/* Revenue Bar Chart */}
          <div className="col-md-7">
            <div className="panel">
              <div className="panel-title">Revenue Contribution by Cluster</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueData} barSize={36}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `₹${v / 1000}K`}
                  />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                    {revenueData.map((entry, i) => (
                      <Cell key={i} fill={colors[entry.name] || "#ccc"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="row g-3">
          {/* Age Distribution */}
          <div className="col-md-6">
            <div className="panel">
              <div className="panel-title">Age Group Distribution</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ageData} barSize={28}>
                  <XAxis dataKey="age" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar
                    dataKey="customers"
                    fill="#534AB7"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Spending Distribution */}
          <div className="col-md-6">
            <div className="panel">
              <div className="panel-title">Spending Score Distribution</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={spendingData} barSize={28}>
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar
                    dataKey="customers"
                    fill="#1D9E75"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
