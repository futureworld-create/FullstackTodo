import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.post("http://localhost:8000/register/", {
        username,
        email,
        password,
      });
      setSuccess("Registration successful! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ece9f7 0%, #cfd9df 100%)",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2.5rem 2rem",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            width: "100%",
            maxWidth: "350px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#4f4f4f",
            }}
          >
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  outline: "none",
                  marginBottom: "0.5rem",
                  background: "#f7f7fa",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  outline: "none",
                  marginBottom: "0.5rem",
                  background: "#f7f7fa",
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  outline: "none",
                  background: "#f7f7fa",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                background: loading ? "#bdbdbd" : "#6c63ff",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                marginBottom: "0.5rem",
              }}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          {error && (
            <p
              style={{
                color: "#e74c3c",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              {error}
            </p>
          )}
          {success && (
            <p
              style={{
                color: "#27ae60",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              {success}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
