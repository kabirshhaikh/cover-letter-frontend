import React, { useState } from "react";
import { Form } from "react-router-dom";

const GenerateCoverLetter = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetterFormat, setCoverLetterFormat] = useState("");
  const [companyName, setCompanyName] = useState("");

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

    try {
      const response = await fetch(
        "http://localhost:8080/api/cover-letter/generate",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (response.ok) {
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `cover-letter.${coverLetterFormat}`;
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
    }
  };

  return (
    <div
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
        <form onSubmit={handleSubmit}>
          {/* Upload Resume */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="resume"
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
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
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
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
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
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
              style={{ display: "block", marginBottom: "10px", color: "#666" }}
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
              <option value="professional"></option>
              <option value="pdf">pdf</option>
              <option value="creative">word</option>
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
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            Generate Cover Letter
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateCoverLetter;
