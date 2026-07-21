import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaClipboardList,
    FaListAlt,
    FaSearch,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import Logo from "../../assets/logo/logo.png";

import "./Sidebar.css";
import Swal from "sweetalert2";

import UseAuth from "../../hooks/UseAuth";

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const { Logout } = UseAuth();

    const HandleLogout = async () => {

    const result = await Swal.fire({

        title: "Logout?",

        text: "Are you sure you want to logout?",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#d33",

        cancelButtonColor: "#3085d6",

        confirmButtonText: "Yes, Logout",

        cancelButtonText: "Cancel"

    });

    if (!result.isConfirmed)
        return;

    Logout();

    navigate("/login");

};

    return (

        <div className="sidebar">

            <div className="sidebar-logo">

                <img src={Logo} alt="Logo" />

                <h2>Smart Complaint</h2>

            </div>

            <ul>

                <li className={location.pathname === "/dashboard" ? "active" : ""}>
                    <Link to="/dashboard">
                        <FaHome />
                        Dashboard
                    </Link>
                </li>

                <li className={location.pathname === "/dashboard/register-complaint" ? "active" : ""}>
                    <Link to="/dashboard/register-complaint">
                        <FaClipboardList />
                        Register Complaint
                    </Link>
                </li>

                <li className={location.pathname === "/dashboard/my-complaints" ? "active" : ""}>
                    <Link to="/dashboard/my-complaints">
                        <FaListAlt />
                        My Complaints
                    </Link>
                </li>

                <li className={location.pathname === "/dashboard/track-complaint" ? "active" : ""}>
                    <Link to="/dashboard/track-complaint">
                        <FaSearch />
                        Track Complaint
                    </Link>
                </li>

                <li className={location.pathname === "/dashboard/profile" ? "active" : ""}>
                    <Link to="/dashboard/profile">
                        <FaUser />
                        Profile
                    </Link>
                </li>

            </ul>

            <div className="sidebar-bottom">

                <button
                    className="logout-btn"
                    onClick={HandleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Sidebar;