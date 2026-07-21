import { Outlet } from "react-router-dom";

import OfficerSidebar from "../../../components/OfficerSidebar/OfficerSidebar";

import "./OfficerLayout.css";
import NotificationBell from "../../../components/notifications/NotificationBell";

function OfficerLayout() {

    return (

        <div className="officer-layout">

            <OfficerSidebar />

            <div className="officer-content">

                <NotificationBell />

                <Outlet />

            </div>

        </div>

    );

}

export default OfficerLayout;