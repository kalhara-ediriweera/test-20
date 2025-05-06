import React, { useState } from "react";
import "../../css/SignupPages/user_signup.css";
import logo from "../../assets/Graphics/logo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function user_signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sign-up",
        formData
      );
      console.log(response);
      if (response.data.success) {
        toast.success("Account Created successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(response.data.message || "Error in User Creation");
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error("Account creation failed! Please try again.");
    }
  };

  return (
    <>
      <div id="farmer-signup-container">
        <div id="left-section">
          <img src={logo} alt="Farm Logo" id="logo" />
        </div>

        <div id="right-section">
          <h2 id="signup-title">🌿 Farmer Registration 🌾</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              id="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                id="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <button type="submit" id="signup-button">
              Register
            </button>

            <p id="login-p">
              Already have an account :{" "}
              <Link to="/login" id="p-link">
                Login Here{" "}
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default user_signup;
