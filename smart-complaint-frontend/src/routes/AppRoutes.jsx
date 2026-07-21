import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Citizen
import Dashboard from "../pages/citizen/Dashboard";
import RegisterComplaint from "../pages/citizen/RegisterComplaint/RegisterComplaint";
import MyComplaints from "../pages/citizen/MyComplaints/MyComplaints";
import TrackComplaint from "../pages/citizen/TrackComplaint/TrackComplaint";
import Profile from "../pages/citizen/Profile/Profile";

// Admin
import AdminLayout from "../pages/admin/AdminLayout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import Complaints from "../pages/admin/Complaints";
import AssignComplaint from "../pages/admin/AssignComplaint";
import UpdateStatus from "../pages/admin/UpdateStatus";
import Reports from "../pages/admin/Reports";
import AdminProfile from "../pages/admin/Profile";

//Officer
import OfficerDashboard from "../pages/officer/OfficerDashboard/OfficerDashboard";
import OfficerMyComplaints from "../pages/officer/MyComplaints/MyComplaints";
import OfficerLayout from "../pages/officer/OfficerLayout/OfficerLayout";
import AssignedComplaints from "../pages/officer/AssignedComplaints";
import UploadImages from "../pages/officer/UploadImages";
import OfficerProfile from "../pages/officer/Profile";
import Notifications from "../pages/officer/Notifications";
import ChangePassword from "../pages/officer/ChangePassword";
import ComplaintHistory from "../pages/officer/ComplaintHistory";


import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                {/* Citizen Routes */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/register-complaint"
                    element={
                        <ProtectedRoute>
                            <RegisterComplaint />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/my-complaints"
                    element={
                        <ProtectedRoute>
                            <MyComplaints />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/track-complaint"
                    element={
                        <ProtectedRoute>
                            <TrackComplaint />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Routes */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="complaints"
                        element={<Complaints />}
                    />

                    <Route
                        path="assign"
                        element={<AssignComplaint />}
                    />

                    <Route
                        path="status"
                        element={<UpdateStatus />}
                    />

                    <Route
                        path="reports"
                        element={<Reports />}
                    />

                    <Route
                        path="profile"
                        element={<AdminProfile />}
                    />

                </Route>

                {/* Protected Officer Routes */}

                <Route
                    path="/officer"
                    element={
                        <ProtectedRoute>
                            <OfficerLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="dashboard"
                        element={<OfficerDashboard />}
                    />

                    <Route
                        path="complaints"
                        element={<OfficerMyComplaints />}
                    />
                    <Route
                        path="complaint/:complaintId"
                        element={<AssignedComplaints />}
                    />
                    <Route
                        path="upload/:complaintId"
                        element={<UploadImages />}
                    />
                    <Route
                        path="profile"
                        element={<OfficerProfile />}
                    />
                    <Route
                        path="/officer/notifications"
                        element={
                            <ProtectedRoute>
                                <Notifications />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/officer/change-password"
                        element={<ChangePassword />}
                    />

                    <Route
                        path="/officer/change-password"
                        element={<ChangePassword />}
                    />

                    <Route

                        path="/officer/history/:complaintId"

                        element={<ComplaintHistory />}

                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;