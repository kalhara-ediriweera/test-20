import "../../css/Login/admin-login.css";
import logo from "../../assets/Graphics/logo.png";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { Link } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/adminLogin`,
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
        navigate("/a-dash"); // Redirect after login
      }, 1000);
    } else {
      toast.error(
        data.message || "Login failed, please check your credentials."
      );
    }
  };

  return (
    <>
      <div className="admin-login">
        <form method="post" onSubmit={handleLogin}>
          <img src={logo} alt="logo" className="logo" />
          <div className="admin-login-form">
            <p className="a-login-heading">Admin Login</p>
            <div className="a-login-inputs">
              <label>Email</label>
              <input
                className="a-login-input"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="a-login-inputs">
              <label>Password</label>
              <input
                className="a-login-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="a-log-in-btn">
              Log In
            </button>
            <p className="admin-form-actions">
              Not an Admin ?{" "}
              <Link to="/" className="green">
                Back to Home
              </Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default AdminLogin;
