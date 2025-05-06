import { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "../../css/User_Manager/smartAssit.css";

function EditFarmingDetails() {
    const navigate = useNavigate();
    const { dId } = useParams();
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
    
     useEffect(() => {
            // Fetch user data when component mounts
            async function fetchDetailData() {
              try {
                const response = await axios.get(`http://localhost:5000/api/getDetails/${dId}`);
                if (response.data.success) {
                  setFormData(response.data.detail);  // Populate the form with the fetched data
                } else {
                  console.log("Details not found");
                }
              } catch (error) {
                console.error("Error fetching Details:", error);
              }
            }
            
            fetchDetailData();
          }, [dId]);
    
          const handleSubmit = async (e) => {
            e.preventDefault();
            try {
              const response = await axios.put(`http://localhost:5000/api/detail/${dId}`, formData);
              if (response.data.success) {
                toast.success('details updated successfully!');
                setTimeout(() => {
                    navigate("/profile/SmartAssit");
                }, 1000);
              } else {
                toast.error('Failed to update details.');
              }
            } catch (error) {
              console.error("Error updating details data:", error);
              toast.error('An error occurred while updating the details.');
            }
          };

    const crops = ["Paddy", "Green Gram", "Corn"];

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


                <div>
                <button type="submit" className="add-btn">Submit</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default EditFarmingDetails;