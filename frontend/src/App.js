import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PredictionForm from "./pages/PredictionForm";
import Result from "./pages/Result";
import Customers from "./pages/Customers";
import BillingCounter from "./pages/BillingCounter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import "./App.css";

// Route guard to check for auth token
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" replace />;
}

// Route guard to enforce admin authorization
function AdminRoute({ children }) {
  const token = localStorage.getItem("authToken");
  const isStaff = localStorage.getItem("isStaff") === "true";

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!isStaff) {
    return <Navigate to="/predict" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Protected Admin routes */}
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/predict" element={<ProtectedRoute><PredictionForm /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
        <Route path="/customers" element={<AdminRoute><Customers /></AdminRoute>} />
        <Route path="/billing" element={<AdminRoute><BillingCounter /></AdminRoute>} />
        
        {/* Wildcard 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
