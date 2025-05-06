import { Link, useNavigate } from "react-router-dom";
import '../../css/HomePage/userProfile.css';
import { GoChevronRight, GoPerson, GoCodeOfConduct, GoPackage, GoPersonFill, GoReply,GoHome    } from "react-icons/go";
import logo from "../../assets/Graphics/black.png";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function UserNav() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});


  const logout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

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
            <nav className="user-nav">
            <div className="user-details">
                    <GoPersonFill size={50} className="u-p" color="#3EA65A"/>
                    <div className="u-details">
                        <p className="u-n">{user.full_name}</p>
                        <p className="u-e">{user.email}</p>
                    </div>
                </div>
                <ul className="user-nav-list">
                    <li className="nav-list-item">
                        <Link className="list_none" to='/profile'> <GoPerson size={30}/> Profile</Link>
                        <Link className="list_none" to='/profile'><GoChevronRight /></Link> 
                        
                    </li>
                    <li className="nav-list-item">
                        <Link className="list_none" to='SmartAssit'> <GoCodeOfConduct size={30}/> Smart Farming</Link>
                        <Link className="list_none" to='SmartAssit'><GoChevronRight /></Link> 
                    </li>
                    <li className="nav-list-item">
                        <Link className="list_none" to='TrackOrders'> <GoPackage size={30}/>Track Orders</Link>
                        <Link className="list_none" to='TrackOrders'><GoChevronRight /></Link> 
                    </li>
                    <li className="nav-list-item">
                        <Link className="list_none" to='/'> <GoHome  size={30}/>Back Home</Link>
                        <Link className="list_none" to='/'><GoChevronRight /></Link> 
                    </li>
                    <li className="nav-list-item" style={{cursor: 'pointer'}}>
                        <div className="list_none" onClick={logout} > <GoReply size={30}/>Log Out</div>
                    </li>
                    <li className="nav-list-item">
                        <div className="list_none" > <img src={logo} style={{width: '100px'}} alt="" /> </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default UserNav;