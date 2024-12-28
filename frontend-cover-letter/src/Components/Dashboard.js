import React, { useEffect, useState } from "react";
import { FullPage, Slide } from "react-full-page";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUserData] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You not not logged in");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8080/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.clear();
        alert("Successfully logged out");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log("Error data:", errorData);
      }
    } catch (error) {
      console.log("Error with logout:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("You are not logged in");
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/users/user-details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Data from dashboard", data);
          setUserData(data);
        } else {
          const errorData = await response.json();
          console.log("error", errorData);
        }
      } catch (error) {
        console.log("Error while fetching the user data:", error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <FullPage scrollMode="full-page" duration={800}>
      {/* Slide 1 */}
      <Slide>
        <div
          className="dashboard-section"
          style={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Dropdown Menu */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          >
            <button
              className="dropdown-toggle"
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#6a11cb",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={toggleDropdown}
            >
              Options
            </button>
            {isDropdownOpen && (
              <div
                className="dropdown-menu"
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
                  style={{
                    display: "block",
                    padding: "10px 15px",
                    width: "100%",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/profile")}
                >
                  Manage Profile
                </button>
                <button
                  style={{
                    display: "block",
                    padding: "10px 15px",
                    width: "100%",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1rem",
            }}
          >
            Welcome Back {user ? user.firstName : "null"}
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              maxWidth: "600px",
            }}
          >
            Get started by managing your cover letters below.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => navigate("/generate-cover-letter")}
              style={{
                padding: "20px 40px",
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Generate Cover Letter
            </button>
            <button
              onClick={() => navigate("/view-cover-letters")}
              style={{
                padding: "20px 40px",
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              View My Cover Letters
            </button>
          </div>
        </div>
      </Slide>

      {/* Slide 2 */}
      <Slide>
        <div
          className="dashboard-section"
          style={{
            background: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "1rem",
            }}
          >
            Your Statistics
          </h2>
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "400px",
            }}
          >
            {user && user.coverLettersGenerated > 0 ? (
              <h3
                style={{
                  color: "#007bff",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                }}
              >
                {user.coverLettersGenerated} Cover Letters Generated
              </h3>
            ) : (
              <h3
                style={{
                  color: "#ff416c",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                }}
              >
                0 Cover Letters Generated
              </h3>
            )}
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                color: "#555",
                marginTop: "10px",
              }}
            >
              {user && user.coverLettersGenerated > 0
                ? "Keep generating cover letters and achieve your dream job!"
                : "Generate one today to get started!"}
            </p>
          </div>
        </div>
      </Slide>
    </FullPage>
  );
};

export default Dashboard;
