import { Link, useLocation } from "react-router-dom";

import {
    FaHome,
    FaClipboardList,
    FaUserCheck,
    FaEdit,
    FaChartBar,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import "./AdminSidebar.css";

function AdminSidebar() {

    const location = useLocation();

    return (

        <div className="admin-sidebar">

            <h2>Admin Panel</h2>

            <ul>

                <li>
                    <Link to="/admin/dashboard">
                        <FaHome />
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/admin/complaints">
                        <FaClipboardList />
                        Complaints
                    </Link>
                </li>

                <li>
                    <Link to="/admin/assign">
                        <FaUserCheck />
                        Assign Complaint
                    </Link>
                </li>

                <li>
                    <Link to="/admin/status">
                        <FaEdit />
                        Update Status
                    </Link>
                </li>

                <li>
                    <Link to="/admin/reports">
                        <FaChartBar />
                        Reports
                    </Link>
                </li>

                <li>
                    <Link to="/admin/profile">
                        <FaUser />
                        Profile
                    </Link>
                </li>

            </ul>

            <div className="logout-btn">

                <Link to="/login">
                    <FaSignOutAlt />
                    Logout
                </Link>

            </div>

        </div>

    );

}

export default AdminSidebar;