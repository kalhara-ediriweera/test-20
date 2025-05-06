import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function AddStaff() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/staffSignUp", formData);
            console.log(response);
            if (response.data.success) {
                toast.success("User Added successful!");
                setTimeout(() => {
                    navigate("/a-dash/manStaff");
                }, 1000);
            } else {
                toast.error(response.data.message || "Error in User Creation");
            }
        } catch (error) {
            console.error(error);  // Log the error for debugging
            toast.error("Account creation failed! Please try again.");
        }
    };

    return (
        <div className="add-user-container">
            <h2 className="add-user-heading">Add New Staff</h2>
            <form className="add-user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="button-group">
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" className="submit-btn">Add Staff</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddStaff;
