import React from "react";
import { FullPage, Slide } from "react-full-page";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <FullPage scrollMode="full-page" duration={1000}>
      {/* Slide 1 */}
      <Slide>
        <div
          className="home-section"
          style={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "#fff",
          }}
        >
          <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
            Cover Letter Generator
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              maxWidth: "600px",
              textAlign: "center",
            }}
          >
            Effortlessly create professional cover letters tailored to your job
            applications.
          </p>
        </div>
      </Slide>

      {/* Slide 2 */}
      <Slide>
        <div
          className="features-section"
          style={{
            background: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <h2 style={{ fontSize: "3rem", color: "#333", marginBottom: "1rem" }}>
            Why Choose Us?
          </h2>
          <div
            style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              {
                title: "Upload Your Resume",
                description:
                  "Quickly upload your resume for tailored cover letters.",
              },
              {
                title: "Custom Job Descriptions",
                description: "Input job details for personalized content.",
              },
              {
                title: "Download in Multiple Formats",
                description: "Export your cover letters as PDF or Word files.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  padding: "30px",
                  borderRadius: "15px",
                  background:
                    "linear-gradient(to bottom right, #ffffff, #e9ecef)",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  maxWidth: "300px",
                  flex: "1",
                  minWidth: "250px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
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
                <h3 style={{ color: "#007bff", marginBottom: "1rem" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "#555" }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Slide 3 */}
      <Slide>
        <div
          className="cta-section"
          style={{
            background: "linear-gradient(to top, #6a11cb, #2575fc)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            padding: "50px",
          }}
        >
          <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            Ready to Create Your First Cover Letter?
          </h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Link
              to="/register"
              style={{
                padding: "15px 30px",
                border: "none",
                borderRadius: "8px",
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                color: "#fff",
                fontSize: "1.2rem",
                cursor: "pointer",
                textDecoration: "none",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              style={{
                padding: "15px 30px",
                border: "none",
                borderRadius: "8px",
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "#fff",
                fontSize: "1.2rem",
                cursor: "pointer",
                textDecoration: "none",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              Log In
            </Link>
          </div>
        </div>
      </Slide>
    </FullPage>
  );
};

export default Home;
