import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadingPage.css";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // After 5 seconds, navigate to the dashboard page
    const redirectTimeout = setTimeout(() => {
      navigate("/dash");
    }, 1000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="loading-page">
      <div className="loading-container">
        <div className="back">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
