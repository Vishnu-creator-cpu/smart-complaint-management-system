import { useEffect, useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import ComplaintChart from "../../components/charts/ComplaintChart";

import DashboardService from "../../services/DashboardService";
import RecentComplaints from "../../components/dashboard/RecentComplaints";
import ComplaintTimeline from "../../components/timeline/ComplaintTimeline";
import AnnouncementCard from "../../components/dashboard/AnnouncementCard";
import QuickActions from "../../components/dashboard/QuickActions";
import HeroBg from "../../assets/backgrounds/hero-bg.jpg";
import AIChatbot from "../../components/AIChatbot";


import {
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaPlusCircle,
    FaSearch,
    FaUserEdit,
    FaInfoCircle
} from "react-icons/fa";

import { GetUserName } from "../../utils/Helper";

import "./Dashboard.css";

function Dashboard() {

    const userName = GetUserName();

    const [dashboardData, setDashboardData] = useState({
        totalComplaints: 0,
        pending: 0,
        resolved: 0,
        rejected: 0
    });
    const [recentComplaints, setRecentComplaints]
        = useState([]);

    useEffect(() => {
        LoadDashboard();
    }, []);

    const LoadDashboard = async () => {

        try {

            const data = await DashboardService.GetDashboard();

            console.log("Dashboard Data:", data);

            setDashboardData(data);

            //temporary

            setRecentComplaints([

                {
                    complaintId: 1,
                    complaintNumber: "SC-1001",
                    status: "Pending"
                },

                {
                    complaintId: 2,
                    complaintNumber: "SC-1002",
                    status: "Resolved"
                },

                {
                    complaintId: 3,
                    complaintNumber: "SC-1003",
                    status: "Assigned"
                }

            ]);

        }
        catch (error) {

            console.error("Dashboard Error:", error);

        }

    };

    return (

        <div
            className="dashboard"
            style={{
                backgroundImage: `
                 linear-gradient(
                         135deg,
                            #E0F2FE,
                            #DBEAFE,
                            #EFF6FF),
                             url(${HeroBg})`
                     }}
                  >

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <WelcomeBanner userName={userName} />


                <QuickActions />

                <div className="stats-grid">

                    <StatCard
                        title="Total Complaints"
                        count={dashboardData.totalComplaints}
                        subtitle="Your Complaints"
                        icon={<FaClipboardList />}
                        color="#2563EB"
                    />

                    <StatCard
                        title="Pending"
                        count={dashboardData.pending}
                        subtitle="Waiting for Action"
                        icon={<FaClock />}
                        color="#F59E0B"
                    />

                    <StatCard
                        title="Resolved"
                        count={dashboardData.resolved}
                        subtitle="Successfully Closed"
                        icon={<FaCheckCircle />}
                        color="#22C55E"
                    />

                    <StatCard
                        title="Rejected"
                        count={dashboardData.rejected}
                        subtitle="Need Review"
                        icon={<FaTimesCircle />}
                        color="#EF4444"
                    />

                </div>


                <ComplaintTimeline />

                <AnnouncementCard />

                <div className="dashboard-extra-grid">

                    <div className="recent-activity-card">

                        <h2>Recent Activities</h2>

                        <ul>

                            <li>Your complaint has been successfully registered.</li>

                            <li>Track complaint status in real time.</li>

                            <li>Email notifications are enabled for updates.</li>

                            <li>Government officers are processing complaints efficiently.</li>

                            <li>Complaint history is available anytime.</li>

                        </ul>

                    </div>


                    <div className="quick-actions-card">

                        <h2>Quick Actions</h2>

                        <button>
                            <FaPlusCircle />
                            Register New Complaint
                        </button>

                        <button>

                            <FaSearch />
                            Track Complaint Status

                        </button>

                        <button>

                            <FaUserEdit />
                            Manage Your Profile

                        </button>

                        <button>

                            <FaClipboardList />

                            My Complaints

                        </button>

                    </div>


                    <div className="tips-card">

                        <h2>

                            <FaInfoCircle />

                            Complaint Tips

                        </h2>

                        <p>

                            <p>

                                Provide accurate complaint details and upload
                                clear images with proper location information
                                for faster and transparent grievance resolution.

                            </p>

                        </p>

                    </div>


                    <div className="updates-card">

                        <h2>Latest Updates</h2>

                        <p>

                            <p>

                                Smart Complaint Management System is now
                                equipped with real-time complaint tracking,
                                email notifications, complaint history and
                                role-based government complaint management.

                            </p>

                        </p>

                    </div>

                </div>

                

            </div>

            <AIChatbot />

        </div>

    );

}

export default Dashboard;