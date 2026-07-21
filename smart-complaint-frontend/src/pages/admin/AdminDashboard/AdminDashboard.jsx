import { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";
import "./AdminDashboard.css";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        FetchDashboard();

    }, []);

    const FetchDashboard = async () => {

        const data = await AdminService.GetDashboard();

        setDashboard(data);

    };

    if (!dashboard) {
        return <h2>Loading...</h2>;
    }

    return (

        <div className="dashboard-container">

            <h1 className="dashboard-title">
                Admin Dashboard
            </h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Complaints</h3>
                    <p>{dashboard.totalComplaints}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Submitted</h3>
                    <p>{dashboard.submittedComplaints}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Assigned</h3>
                    <p>{dashboard.assignedComplaints}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Resolved</h3>
                    <p>{dashboard.resolvedComplaints}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Users</h3>
                    <p>{dashboard.totalUsers}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Officers</h3>
                    <p>{dashboard.totalOfficers}</p>
                </div>

            </div>

        </div>

    );
}

export default AdminDashboard;