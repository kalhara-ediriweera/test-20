import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function UpdateStaff() {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get user ID from URL To navigate back or to another page

  console.log("User ID:", userId);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Fetch user data when component mounts
    async function fetchUserData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/staff/${userId}`
        );
        if (response.data.success) {
          setFormData(response.data.staff); // Populate the form with the fetched data
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/staff/${userId}`,
        formData
      );
      if (response.data.success) {
        toast.success("User updated successfully!");
        setTimeout(() => {
          navigate("/a-dash/manStaff");
        }, 1000);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating the user.");
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    // Ensure all values are treated as strings
    const fullName = String(formData.full_name || "").trim();
    const email = String(formData.email || "").trim();
    const phone = String(formData.phone || "").trim();
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


    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-heading">Update Staff</h2>
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
            Update Staff
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateStaff;
