import { Link, useNavigate } from "react-router-dom";
import "../../css/HomePage/navbar.css";
import logo from "../../assets/Graphics/logo.png";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function NavBar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  function handleLogIn() {
    navigate("/login");
  }

  function handleSignUp() {
    navigate("/sign_up");
  }
  function goHome() {
    navigate("/");
  }
  const goProfile = () => {
    navigate("/profile");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in

      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  return (
    <>
      <nav className="home-nav">
        <img onClick={goHome} src={logo} style={{ cursor: "pointer" }} alt="logo" className="logo" />
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/store" className="nav-link">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contacts
            </Link>
          </li>
        </ul>
        <div>
          {isLoggedIn ? (
            <>
              <div className="nav-c">
                <h3 onClick={() => goProfile()} style={{ cursor: "pointer" }}>

                  Hi !{" " + userName}

                </h3>
                <button className="log-out" onClick={logout} type="submit">
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="nav-actions">
                <button className="log-in" onClick={handleLogIn}>
                  Log In
                </button>
                <button className="log-in" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
