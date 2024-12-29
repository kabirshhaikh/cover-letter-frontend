import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageProfile = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Send Verification Code, Step 2: Verify and Update Password
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendVerificationCode = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("email", email);
      const response = await fetch(
        "http://localhost:8080/api/users/verification",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Verification code sent to your email.");
        setStep(2); // Move to the next step
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to send verification code.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndUpdatePassword = async () => {
    if (!verificationCode || !newPassword) {
      alert("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("newPassword", newPassword);
      formData.append("verificationCode", verificationCode);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/users/verify-and-update-password",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert(
          "Password updated successfully. You will now be redirected to login with your new password."
        );
        localStorage.clear();
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Manage Profile</h2>
      {step === 1 ? (
        <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <h3>Send Verification Code</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={handleSendVerificationCode}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              background: "linear-gradient(to right, #ff416c, #ff4b2b)",
              color: "#fff",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <h3>Verify and Update Password</h3>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={handleVerifyAndUpdatePassword}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              background: "linear-gradient(to right, #4caf50, #81c784)",
              color: "#fff",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            {isLoading ? "Updating..." : "Verify and Update Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
