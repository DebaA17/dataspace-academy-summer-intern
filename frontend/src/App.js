import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PredictionForm from "./pages/PredictionForm";
import Result from "./pages/Result";
import Customers from "./pages/Customers";
import BillingCounter from "./pages/BillingCounter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/result" element={<Result />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/billing" element={<BillingCounter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
