import { Link, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaClipboardList,
    FaUser,
    FaSignOutAlt,
    FaBell
} from "react-icons/fa";

import "./OfficerSidebar.css";

function OfficerSidebar() {

    const navigate = useNavigate();

    const HandleLogout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <div className="officer-sidebar">

            <h2>Officer Panel</h2>

            <ul>

                <li>

                    <Link to="/officer/dashboard">

                        <FaHome />

                        Dashboard

                    </Link>

                </li>


                <li>

                    <Link to="/officer/complaints">

                        <FaClipboardList />

                        My Complaints

                    </Link>

                </li>


                <li>

                    <Link to="/officer/profile">

                        <FaUser />

                        Profile

                    </Link>

                </li>

                <li>

                    <Link to="/officer/notifications">
                        <FaBell />
                        Notifications
                    </Link>

                </li>

            </ul>


            <button
                className="officer-logout"
                onClick={HandleLogout}
            >

                <FaSignOutAlt />

                Logout

            </button>

        </div>

    );

}

export default OfficerSidebar;