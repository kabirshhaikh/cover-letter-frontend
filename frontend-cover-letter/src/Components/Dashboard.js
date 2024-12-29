import React, { useEffect, useState } from "react";
import { FullPage, Slide } from "react-full-page";
import { useNavigate } from "react-router-dom";
import OptionsMenu from "./OptionsMenu"; // Import the reusable OptionsMenu component

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUserData] = useState(null);

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
          console.log("Error:", errorData);
        }
      } catch (error) {
        console.error("Error while fetching the user data:", error);
      }
    };
    fetchUserDetails();
  }, [navigate]);

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
          {/* OptionsMenu */}
          <OptionsMenu /> {/* Integrated reusable component */}

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1rem",
            }}
          >
            Welcome Back {user ? user.firstName : "User"}
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
