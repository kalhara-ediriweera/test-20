import { GoChevronRight, GoPerson, GoCodeOfConduct, GoPackage, GoPersonFill, GoReply   } from "react-icons/go";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserEditProfile() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true); // User is logged in
    
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      }, []);
    
      useEffect(() => {
        async function fetchUsers() {
          try {
            const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
            setUser(response.data.user);
          } catch (err) {
            console.error("Error fetching users:", err);
          }
        }
      
        if (userId) { 
          fetchUsers();
        }
      }, [userId]); 

    return (
        <>
            <div className="user-dash">
                <div className="user-details">
                 <GoPersonFill size={50} className="u-p" color="#3EA65A"/>
                    <div className="u-details">
                            <p className="u-n">{user.full_name}</p>
                            <p className="u-e">{user.email}</p>
                    </div>
                </div>
                <div className="u-detail-main">
                    <div className="u-d-item">
                    <p className="u-n">Name</p>
                    <p className="u-e">{user.full_name}</p>
                    </div>
                    <hr className="pad-10"/>
                    <div className="u-d-item">
                    <p className="u-n">Email</p>
                    <p className="u-e">{user.email}</p>
                    </div>
                    <hr className="pad-10"/>
                    <div className="u-d-item">
                    <p className="u-n">Address</p>
                    <p className="u-e">{user.address}</p>
                    </div>
                    <hr className="pad-10"/>
                    <div className="u-d-item">
                    <p className="u-n">Phone</p>
                    <p className="u-e">{user.phone}</p>
                    </div>
                    <hr className="pad-10"/>
                    <div className="u-d-item">
                    <p className="u-n">Password</p>
                    <p className="u-e">*******</p>
                    </div>
                </div>

                <div className="user-actions">
                    <button className="btn edit-btn">✏️ Edit Details</button>
                    <button className="btn delete-btn">🗑️ Delete Account</button>
                </div>
            </div>
        </>
    );
}

export default UserEditProfile;