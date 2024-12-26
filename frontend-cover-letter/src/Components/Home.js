import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Cover Letter Generator</h1>
        <p>Effortlessly create professional cover letters tailored to your job applications.</p>
      </header>

      <section className="home-content">
        <p>
          Our intuitive tool helps you:
        </p>
        <ul>
          <li>Upload your resume.</li>
          <li>Enter job descriptions.</li>
          <li>Generate personalized cover letters in PDF or Word format.</li>
          <li>Download your generated cover letters for easy application.</li>
        </ul>
      </section>

      <section className="home-actions">
        <Link to="/login" className="button">Login</Link>
        <Link to="/register" className="button">Register</Link>
      </section>
    </div>
  );
}

export default Home;