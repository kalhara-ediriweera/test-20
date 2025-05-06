
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/Graphics/logo.png"
import { useNavigate } from "react-router-dom";


function StaffNav() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            setIsLoggedIn(true); 
            
            const decodedToken = jwtDecode(token);
            setUserName(decodedToken.name); 
        } else {
            setIsLoggedIn(false); 
        }
    }, []);

    return (
        <>
            <nav className="a-nav">        
                <ul>
                    <img src={logo} alt="logo" className="logo" />
                <h1 className="nav-head">Hi! 😎 {userName}</h1>
                    <li><Link className='text-none a-nav-link' to="/s-dash">Dashboard</Link></li>
                    <li><Link className='text-none a-nav-link' to="manPrd">Manage Products</Link></li>
                    <li><Link className='text-none a-nav-link' to="payments">Payments</Link></li>
                    <li><Link className='text-none a-nav-link' to="payments">Profile</Link></li>
                </ul>

                <div className="nav-a">
                    <button id='login-btn' onClick={logout} type="submit">Log Out</button>
                </div>
            </nav>
        </>
    );
}

export default StaffNav;