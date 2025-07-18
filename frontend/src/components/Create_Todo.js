import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TodoNavbar from "./TodoNavbar";

function Create_Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/add_todo/",
        {
          title,
          description,
          due_date: dueDate,
          completed,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setSuccess(
        "Todo created successfully! 🎉 You are one step closer to world domination!"
      );
      setTitle("");
      setDescription("");
      setDueDate("");
      setCompleted(false);
    } catch (error) {
      setError("Failed to create todo.");
    } finally {
      setLoading(false);
    }
  };

  // Fade out success message after 2 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <>
      <TodoNavbar></TodoNavbar>
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
            maxWidth: "400px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#4f4f4f",
            }}
          >
            Create Todo
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#6c63ff",
                }}
              >
                Title:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#6c63ff",
                }}
              >
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  outline: "none",
                  background: "#f7f7fa",
                  minHeight: "80px",
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#6c63ff",
                }}
              >
                Due Date:
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ color: "#6c63ff" }}>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  style={{ marginRight: "0.5rem" }}
                />
                Completed
              </label>
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
              {loading ? "Creating..." : "Create Todo"}
            </button>
          </form>
          {(error || success) && (
            <div
              style={{
                position: "fixed",
                top: 30,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
                minWidth: 280,
                maxWidth: 400,
                color: "#fff",
                background: error ? "#e74c3c" : "#27ae60",
                borderRadius: 12,
                padding: "1rem 1.5rem",
                textAlign: "center",
                fontWeight: "bold",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                fontSize: "1.1rem",
                opacity: 1,
                transition: "opacity 0.5s",
              }}
            >
              {error || success}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Create_Todo;
