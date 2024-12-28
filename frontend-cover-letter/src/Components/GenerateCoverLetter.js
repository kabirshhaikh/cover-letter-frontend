import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenerateCoverLetter = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetterFormat, setCoverLetterFormat] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFormatChange = (e) => {
    setCoverLetterFormat(e.target.value);
  };

  const handleHomeClick = () => {
    navigate("/dashboard"); // Navigate to the Dashboard component
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDescription || !coverLetterFormat) {
      alert("Please fill all the fields and upload a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);
    formData.append("coverLetterFormat", coverLetterFormat);
    formData.append("companyName", companyName);

    setIsLoading(true); // Show spinner when the process starts

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in");
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/cover-letter/generate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const coverLetterFormatToBeAttached =
          coverLetterFormat === "word" ? ".docx" : ".pdf";
        const a = document.createElement("a");
        a.href = url;
        a.download = `cover-letter.${coverLetterFormatToBeAttached}`;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        a.remove();
      } else {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
        alert("Error generating cover letter: " + errorMessage);
      }
    } catch (error) {
      console.error("Error while submitting the cover letter info:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Hide spinner when the process finishes
    }
  };

  return (
    <div
      style={{
        position: "relative", // Allows absolute positioning of Home button
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Home Button */}
      <button
        onClick={handleHomeClick}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          background: "linear-gradient(to right, #4caf50, #81c784)",
          border: "none",
          borderRadius: "5px",
          color: "#fff",
          fontSize: "0.9rem",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          zIndex: 10, // Ensure it stays on top of other elements
        }}
      >
        Home
      </button>

      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h2
          style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}
        >
          Generate Cover Letter
        </h2>

        {isLoading ? (
          <div style={{ marginBottom: "20px" }}>
            <div
              className="spinner"
              style={{ fontSize: "2rem", color: "#6a11cb" }}
            >
              Loading...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Upload Resume */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="resume"
                style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#666",
                }}
              >
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Job Description */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="jobDescription"
                style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#666",
                }}
              >
                Job Description
              </label>
              <textarea
                id="jobDescription"
                rows="5"
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Paste the job description here..."
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              ></textarea>
            </div>

            {/* Company Name */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="companyName"
                style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#666",
                }}
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={handleCompanyNameChange}
                placeholder="Enter the company name"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              />
            </div>

            {/* Cover Letter Format */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="format"
                style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#666",
                }}
              >
                Expected Cover Letter Format
              </label>
              <select
                id="format"
                value={coverLetterFormat}
                onChange={handleFormatChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                required
              >
                <option value="">Select Format</option>
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
              </select>
            </div>

            {/* Submit Button */}
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
            >
              Generate Cover Letter
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default GenerateCoverLetter;
