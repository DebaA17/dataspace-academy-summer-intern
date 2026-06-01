import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#ffffff", borderBottom: "2px solid #e0e0e0" }}
    >
      <div className="container">
        {/* Logo / Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a73e8, #ff6d00)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            N
          </div>
          <span
            style={{ fontWeight: "700", fontSize: "20px", color: "#1a73e8" }}
          >
            Amajon
          </span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{
                  fontWeight: "500",
                  color: location.pathname === "/" ? "#1a73e8" : "#555",
                  borderBottom:
                    location.pathname === "/" ? "2px solid #1a73e8" : "none",
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/predict"
                style={{
                  fontWeight: "500",
                  color: location.pathname === "/predict" ? "#1a73e8" : "#555",
                  borderBottom:
                    location.pathname === "/predict"
                      ? "2px solid #1a73e8"
                      : "none",
                }}
              >
                Predict
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
