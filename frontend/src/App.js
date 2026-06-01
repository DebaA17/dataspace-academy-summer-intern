import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PredictionForm from "./pages/PredictionForm";
import Result from "./pages/Result";
import "./App.css";

const routerFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

function App() {
  return (
    <Router future={routerFutureFlags}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
