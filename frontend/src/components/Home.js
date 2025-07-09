import React from "react";
import Navbar from "./Navbar";

const Home = () => {

 return (
    <>
    <Navbar></Navbar>
 <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <h1 style={{ color: "#6c63ff", fontSize: "2.5rem", marginBottom: "1rem" }}>
      Welcome to TodoList
    </h1>
    <p style={{ color: "#555", fontSize: "1.1rem" }}>
      Organize your tasks efficiently and stay productive!
    </p>
  </div>
  </>
)

};

export default Home;
