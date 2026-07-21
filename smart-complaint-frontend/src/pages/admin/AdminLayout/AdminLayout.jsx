import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import "./AdminLayout.css";
import NotificationBell from "../../../components/notifications/NotificationBell";

function AdminLayout() {
    return (
        <div className="admin-layout">


            <AdminSidebar />

            <div className="admin-content">

                <NotificationBell />

                <Outlet />

            </div>

        </div>
    );
}

export default AdminLayout;