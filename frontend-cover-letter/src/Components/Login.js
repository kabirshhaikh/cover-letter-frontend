import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCreds = { email, password };

      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreds),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", data.userId);
        alert("Login successful");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      console.log(error);
      alert("Login failed", error);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        padding: "20px",
      }}
    >
      <div
        className="login-form"
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              background: "linear-gradient(to right, #ff416c, #ff4b2b)",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px", color: "#666" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#6a11cb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
