import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import OfficerService from "../../../services/OfficerService";

import "./OfficerDashboard.css";
import OfficerWelcomeBanner from "../../../components/dashboard/OfficerWelcomeBanner";

function OfficerDashboard() {

    const [complaints, setComplaints] = useState([]);
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        LoadComplaints();

    }, []);


    const LoadComplaints = async () => {

        const data =
            await OfficerService.GetMyComplaints();

        setComplaints(data);

    };


    const assignedCount = complaints.length;

    const resolvedCount = complaints.filter(
        (item) => item.status === "Resolved"
    ).length;

    const pendingCount = complaints.filter(
        (item) => item.status !== "Resolved"
    ).length;

    useEffect(() => {

        LoadDashboard();

    }, []);


    const LoadDashboard = async () => {

        try {

            const data =
                await OfficerService.GetDashboard();

            setDashboard(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load dashboard.",
                confirmButtonText: "OK"
            });

        }

    };

    if (!dashboard) {

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <div className="dashboard-container">

            <h1>Officer Dashboard</h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <h2>
                        {dashboard.totalAssigned}
                    </h2>

                    <p>
                        Total Assigned
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>
                        {dashboard.totalResolved}
                    </h2>

                    <p>
                        Resolved
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>
                        {dashboard.totalInProgress}
                    </h2>

                    <p>
                        In Progress
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>
                        {dashboard.totalPending}
                    </h2>

                    <p>
                        Pending
                    </p>

                </div>

            </div>

        </div>

    );

}

export default OfficerDashboard;