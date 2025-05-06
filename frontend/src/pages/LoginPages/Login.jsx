import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import logo from "../../assets/Graphics/logo.png";
import "../../css/Login/user_login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/login`,
        userData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        toast.error("Network error, please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    const data = await login(formData);
    if (data.success) {
      toast.success("Login Successful!");
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/"); // Redirect after login
      }, 1000);
    } else {
      toast.error(
        data.message || "Login failed, please check your credentials."
      );
    }
  };

  return (
    <>
      <div id="farmer-login-container">
        <div id="left-section">
          <img src={logo} alt="Farm Logo" id="logo" />
        </div>

        <div id="right-section">
          <h2 id="login-title">🌿 Farmer Login 🌾</h2>
          <form onSubmit={handleLogin}>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <button
                type="button"
                id="toggle-btnn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <button type="submit" id="login-button">
              Login
            </button>
            <p id="login-p">
              Don't have an account :{" "}
              <Link to="/sign_up" id="p-link">
                Register Here{" "}
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default UserLogin;
