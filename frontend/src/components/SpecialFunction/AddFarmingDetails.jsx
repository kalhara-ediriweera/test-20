import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "../../css/User_Manager/smartAssit.css";

function AddFarmingDetails() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            farmer_id: '',
            farmer_name: '',
            crop_name: '',
            area: '',
            location: '',
        });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            const decodedToken = jwtDecode(token);
            setFormData((prevData) => ({
                ...prevData,
                farmer_id: decodedToken.id,
                farmer_name: decodedToken.name,
            }));
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    

    const crops = ["Paddy", "Green Gram", "Corn"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/addDetails", formData);
            console.log(response);
            if (response.data.success) {
                toast.success("Details Added successful!");
                setTimeout(() => {
                    navigate("/profile/SmartAssit");
                }, 1000);
            } else {
                toast.error(response.data.message || "Error in Details");
            }
        } catch (error) {
            console.error(error);  // Log the error for debugging
            toast.error("Details creation failed! Please try again.");
        }
    };

    return (
        <div className="smart-farming-details">
            <h1>Add Your Farming Details</h1>
            <form className="smart-form" onSubmit={handleSubmit}>

                <label>Crop Name:</label>
                <select name="crop_name" value={formData.crop_name} onChange={handleChange}  required>
                    <option value="">Select Crop</option>
                    {crops.map((crop, index) => (
                        <option key={index} value={crop}>
                            {crop}
                        </option>
                    ))}
                </select>

                    <label>Area: Hectares (ha)</label>
                    <input
                        name="area"
                        type="number"
                        value={formData.area}
                        onChange={handleChange} 
                        required
                        placeholder="Enter Area"
                    />
    

                <label>Location :</label>
                <input
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange} 
                    required
                    placeholder="Enter Location"
                />


                <button type="submit" className="add-btn">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddFarmingDetails;
