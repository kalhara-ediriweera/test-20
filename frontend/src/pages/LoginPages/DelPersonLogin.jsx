
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import '../../css/Login/delPersonLogin.css'

function DelPerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/delPerlogin`,
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
        navigate("/delPer-dash"); // Redirect after login
      }, 1000);
    } else {
      toast.error(
        data.message || "Login failed, please check your credentials."
      );
    }
  };

  return (
    <>
      <div id="login">
        <img
          id="r-log"
          src="../src/assets/images/graphics/login.svg"
          alt=""
        />
        <div id="l-log">
          <form id="log-in" onSubmit={handleLogin}>
            <h1 id="log-head">Delivery Person Log-In</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <button id="login-btn2" type="submit">
              Login
            </button>

            <p>
              ⬅{" "}
              <Link id="link" to="/">
                Home
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default DelPerLogin;
