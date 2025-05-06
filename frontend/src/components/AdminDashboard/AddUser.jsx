import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((err) => toast.error(err));
      return; // Stop execution if validation fails
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sign-up",
        formData
      );

      if (response.data.success) {
        toast.success("User Added successfully!");
        setTimeout(() => {
          navigate("/a-dash/manUser");
        }, 1000);
      } else {
        toast.error(response.data.message || "Error in User Creation");
      }
    } catch (error) {
      console.error(error);
      toast.error("Account creation failed! Please try again.");
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    // Convert values to strings to avoid .trim() errors
    const fullName = String(formData.full_name || "").trim();
    const email = String(formData.email || "").trim();
    const phone = String(formData.phone || "").trim();
    const address = String(formData.address || "").trim();
    const password = String(formData.password || "").trim();

    if (!fullName) {
      errors.full_name = "Full Name is required.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    if (!address) {
      errors.address = "Address is required.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    return errors;
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-heading">Add New User</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="submit-btn">
            Add User
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddUser;
