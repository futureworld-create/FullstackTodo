import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const TodoNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.get("http://localhost:8000/logout/", {
        headers: {
          Authorization: token ? `Token ${token}` : undefined,
        },
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
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
        <NavLink
          to="/"
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.3rem",
            textDecoration: "none",
          }}
        >
          Todo App
        </NavLink>
        <div>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#ffd600" : "#fff",
              marginRight: "1.5rem",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
              fontSize: "1rem",
              transition: "color 0.2s",
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/add_todo"
            style={({ isActive }) => ({
              color: isActive ? "#ffd600" : "#fff",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
              fontSize: "1rem",
              transition: "color 0.2s",
            })}
          >
            Add Todo
          </NavLink>
          <NavLink
            to="/list_todo"
            style={({ isActive }) => ({
              color: isActive ? "#ffd600" : "#fff",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal",
              fontSize: "1rem",
              transition: "color 0.2s",
              marginLeft: "1.5rem",
            })}
          >
            List Todo
          </NavLink>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "normal",
              fontSize: "1rem",
              transition: "color 0.2s",
              marginLeft: "1.5rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TodoNavbar;
