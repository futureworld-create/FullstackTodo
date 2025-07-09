import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddTodo from "./components/Create_Todo";
import TodoList from "./components/TodoList";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/navbar", element: <Navbar /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/TodoNavbar", element: <Navbar /> },
  { path: "/add_todo", element: <AddTodo /> },
  { path: "/list_todo", element: <TodoList /> },
]);

export default router;
