import React from "react";
import { NavLink } from "react-router-dom";
import TodoNavbar from "./TodoNavbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const TodoList = () => {
  // const dispatch = useDispatch();
  // const todos = useSelector((state) => state.todos);
  const [todoList, setTodoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const [filteredTodos, setFilteredTodos] = useState([]); // Removed duplicate filteredTodos state

  // Removed duplicate filteredTodos state
  useEffect(() => {
    // Get token from localStorage or Redux state

    axios
      .get("http://localhost:8000/list_todo/", {
        headers: {
          Authorization: token ? `Token ${token}` : undefined,
        },
      })
      .then((response) => {
        setTodoList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);
  const completedTask = (id, status) => {
    // Update the todo completion status
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:8000/completed_todo/${id}/`,
        { completed: status },
        {
          headers: {
            Authorization: token ? `Token ${token}` : undefined,
          },
        }
      )
      .then((response) => {
        setTodoList((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: status } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:8000/delete_todo/${id}/`, {
        headers: {
          Authorization: token ? `Token ${token}` : undefined,
        },
      })
      .then(() => {
        // Remove the deleted todo from the state immediately
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  // Filter todos based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todoList);
    }
  }, [searchTerm, todoList]);
  // Filter todos based on status
  const [filter, setFilter] = useState("");
  useEffect(() => {
    if (filter) {
      const filtered = todoList.filter((todo) =>
        filter === "completed" ? todo.completed : !todo.completed
      );
      setFilteredTodos(filtered);
    } else {
      setFilteredTodos(todoList);
    }
  }, [filter, todoList]);
  // Export todos as JSON or text
  const exportTodos = (format) => {
    const data =
      format === "json"
        ? JSON.stringify(filteredTodos)
        : filteredTodos
            .map((todo) => `${todo.id}: ${todo.title} :${todo.due_date}`)
            .join("\n");
    const blob = new Blob([data], {
      type: format === "json" ? "application/json" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `todos.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <TodoNavbar />
      <h2 style={{ textAlign: "center", margin: "1.5rem 0", color: "#6c63ff" }}>
        Your Todo List
      </h2>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: 24,
        }}
      >
        {/* Search Field */}
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              maxWidth: 350,
              padding: "0.5rem 1rem",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            }}
          />
        </div>
        {/* Filter button for pending and completed  */}
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            }}
          >
            <option value="">All Todos</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              background: "#6c63ff",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => exportTodos("json")}
          >
            Export as JSON
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
              outline: "none",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              background: "#388e3c",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => exportTodos("text")}
          >
            Export as Plain Text
          </button>
        </div>

        {filteredTodos.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888" }}>
            No todos found.
          </div>
        ) : null}
        {filteredTodos.length > 0 && (
          <div>
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              <div style={{ flex: 2, color: "#6c63ff" }}>TASK</div>
              <div style={{ flex: 3, color: "#888" }}>Description</div>
              <div style={{ flex: 2, color: "#888", textAlign: "center" }}>
                Due Date
              </div>
              <div style={{ flex: 2, color: "#888", textAlign: "center" }}>
                Status
              </div>
              <div style={{ flex: 4, color: "#888", textAlign: "center" }}>
                Actions
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 0.5rem",
                    borderBottom: "1px solid #eee",
                    background: todo.completed ? "#e0ffe0" : "#f9f9f9",
                    borderRadius: 6,
                    marginBottom: 8,
                  }}
                >
                  <div style={{ flex: 2 }}>
                    <strong
                      style={{ color: todo.completed ? "#388e3c" : "#333" }}
                    >
                      {todo.title}
                    </strong>
                  </div>
                  <div style={{ flex: 3, color: "#666" }}>
                    {todo.description}
                  </div>
                  <div style={{ flex: 2, textAlign: "center", color: "#666" }}>
                    {todo.due_date
                      ? new Date(todo.due_date).toLocaleDateString()
                      : "No due date"}
                  </div>
                  <div style={{ flex: 2, textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => completedTask(todo.id, !todo.completed)}
                      readOnly
                      style={{ width: 18, height: 18, accentColor: "#388e3c" }}
                    />
                  </div>
                  <div
                    style={{
                      flex: 4,
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <NavLink
                      to={`/todo/${todo.id}`}
                      style={{
                        background: "#6c63ff",
                        color: "#fff",
                        borderRadius: 4,
                        padding: "0.4rem 0.8rem",
                        textDecoration: "none",
                        fontWeight: "bold",
                        marginRight: 8,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                        transition: "background 0.2s",
                      }}
                    >
                      View
                    </NavLink>
                    <NavLink
                      to={`/edit_todo/${todo.id}`}
                      style={{
                        background: "#ffd600",
                        border: "none",
                        borderRadius: 4,
                        padding: "0.4rem 0.8rem",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                      }}
                    >
                      Edit
                    </NavLink>
                    <button
                      style={{
                        background: "#ff5252",
                        border: "none",
                        borderRadius: 4,
                        padding: "0.4rem 0.8rem",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                      }}
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoList;
