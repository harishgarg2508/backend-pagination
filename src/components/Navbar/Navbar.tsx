import React from "react";
import { useUser } from "../../pages/userdata";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
    const { userData } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="nav-list">
                    <li >
                        <img src="https://shorturl.at/jyRmg" alt="Logo" className="nav-logo" />
                    </li>
                    <li >
                        <span className="user-name">
                            {userData?.fullName || "Guest"}
                        </span>
                    </li>
                    <li >
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;