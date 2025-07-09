import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav
    style={{
      width: "100%",
      background: "#6c63ff",
      padding: "1rem 0",
      marginBottom: "2rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}
  >
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
      }}
    >
      <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.3rem" }}>
        TodoList
      </span>
      <div>
        <Link
          to="/"
          style={{
            color: "#fff",
            marginRight: "1.5rem",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
        <Link
          to="/login"
          style={{
            color: "#fff",
            marginRight: "1.5rem",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
        <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
          Register
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
