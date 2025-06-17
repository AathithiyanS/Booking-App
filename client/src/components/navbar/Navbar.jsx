import { useContext, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">
          <span>GoBooking</span>
        </Link>

        {user ? (
          <div className="navItems">
            <div className="userDropdown">
              <span
                className="username"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.username} ▾
              </span>

              {showDropdown && (
                <div className="dropdownMenu">
                  <button onClick={handleLogout} className="dropdownItem">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="navItems">
            <button onClick={() => navigate("/register")} className="navButton">Register</button>
            <button onClick={() => navigate("/login")} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
