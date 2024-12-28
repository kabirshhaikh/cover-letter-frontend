import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewCoverLetters = () => {
  const navigate = useNavigate();
  const [coverLetters, setCoverLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You are not logged in");
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/cover-letter/cover-letter-list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Data from backend: ", data);
          setCoverLetters(data.list); // Extract the list of cover letters
        } else {
          const errorData = await response.json();
          console.log("Error data: ", errorData);
          alert("Failed to fetch cover letters.");
        }
      } catch (error) {
        console.log("Error while fetching the cover letters: ", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoverLetters();
  }, [navigate]);

  const handleCoverLetterDownload = async (coverLetterId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/cover-letter/cover-letter/${coverLetterId}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
       const data = await response.json();
       const link = data.link;
      window.open(link, "_blank");
      } else {
        const errorData = await response.json();
        console.log("Error data: ", errorData);
      }
    } catch (error) {
      console.log("Error while downloading cover letter: ", error);
    }
  };

  const handleResumeDownload = async (resumeID) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
        navigate("/login");
        return;
      }
  
      const response = await fetch(
        `http://localhost:8080/api/cover-letter/resume/${resumeID}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();  
        const link = data.link;
       window.open(link, "_blank");
      } else {
        const errorData = await response.json();
        console.log("Error data: ", errorData);
        alert("Failed to download the resume.");
      }
    } catch (error) {
      console.log("Error while downloading resume: ", error);
      alert("An error occurred while downloading the resume. Please try again.");
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>My Cover Letters</h1>

      {isLoading ? (
        <div style={{ fontSize: "1.5rem", color: "#fff" }}>Loading...</div>
      ) : coverLetters.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {coverLetters.map((letter) => (
            <div
              key={letter.id}
              style={{
                background: "#fff",
                color: "#333",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                width: "300px",
                textAlign: "center",
              }}
            >
              <h3>{letter.companyName}</h3>
              <p>Format: {letter.exportFormat}</p>
              <p>Generated on: {new Date(letter.createdAt).toLocaleString()}</p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => handleCoverLetterDownload(letter.id)}
                  style={{
                    padding: "10px 15px",
                    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                    border: "none",
                    borderRadius: "5px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Download Cover Letter
                </button>
                <button
                  onClick={() => handleResumeDownload(letter.resume.id)}
                  style={{
                    padding: "10px 15px",
                    background: "linear-gradient(to right, #4caf50, #81c784)",
                    border: "none",
                    borderRadius: "5px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Download Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cover letters found. Generate one to get started!</p>
      )}
    </div>
  );
};

export default ViewCoverLetters;