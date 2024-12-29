import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OptionsMenu = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.clear();
        alert("Successfully logged out.");
        navigate("/login");
      } else {
        alert("Failed to logout.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ position: "absolute", top: "20px", right: "20px" }}>
      <button
        onClick={toggleDropdown}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          background: "#ffffff",
          color: "#6a11cb",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Options
      </button>
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "0",
            background: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            onClick={() => navigate("/manage-profile")}
            style={{
              display: "block",
              padding: "10px 15px",
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Manage Profile
          </button>
          <button
            onClick={logout}
            style={{
              display: "block",
              padding: "10px 15px",
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
