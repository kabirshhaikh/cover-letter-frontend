import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        firstName,
        lastName,
        email,
        password,
        gender,
        dob,
      };

      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.error}`);
      } else {
        alert("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      alert("Registration failed:", error);
    }
  };

  return (
    <div
      className="register-container"
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
        className="register-form"
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="firstName"
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
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
              htmlFor="lastName"
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
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
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="gender"
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="dob"
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={handleDobChange}
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
            Register
          </button>
        </form>
        <p style={{ marginTop: "20px", color: "#666" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#6a11cb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
