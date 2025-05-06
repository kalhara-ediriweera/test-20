import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Error/err_404_page.css";
import Error from "../../assets/Graphics/error.jpeg";

function err_404_page() {
  return (
    <>
      <div id="err-container">
        <div id="err-content">
          <img src={Error} alt="404 Not Found" id="err-image" />
          <p id="err-text">Oops! The page you're looking for doesn't exist.</p>
          <Link to="/" id="err-button">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default err_404_page;
