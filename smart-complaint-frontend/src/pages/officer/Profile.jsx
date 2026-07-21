import "./Profile.css";

import {
    FaUserShield,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaBuilding,
    FaClipboardCheck
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import OfficerService from "../../services/OfficerService";

function Profile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);


    useEffect(() => {

        LoadProfile();

    }, []);


    const LoadProfile = async () => {

        try {

            const data = await OfficerService.GetProfile();

            setProfile(data);

        }

        catch (error) {

            console.error("Profile Error :", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load profile.",
                confirmButtonText: "OK"
            });

        }

    };

    const HandleLogout = async () => {

        const result = await Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {

            localStorage.clear();

            navigate("/login");

        }

    };


    if (!profile) {

        return <h2>Loading Profile...</h2>;

    }


    // Performance Calculation

    const performancePercentage =

        profile.totalAssignedComplaints === 0

            ? 0

            : Math.round(

                (profile.totalResolvedComplaints /

                    profile.totalAssignedComplaints) * 100

            );


    const pendingComplaints =

        profile.totalAssignedComplaints -

        profile.totalResolvedComplaints -

        profile.totalInProgressComplaints;



    return (

        <div className="officer-profile">


            {/* Header Card */}

            <div className="profile-header">

                <div className="profile-avatar">

                    <FaUserShield />

                </div>

                <h1>{profile.fullName}</h1>

                <p>{profile.designation}</p>

            </div>



            {/* Details Card */}

            <div className="details-card">

                <h2>Officer Details</h2>

                <div className="details-grid">

                    <div>

                        <FaClipboardCheck />

                        <span>

                            Employee Code : {profile.employeeCode}

                        </span>

                    </div>


                    <div>

                        <FaEnvelope />

                        <span>

                            {profile.email}

                        </span>

                    </div>


                    <div>

                        <FaPhoneAlt />

                        <span>

                            {profile.phoneNumber}

                        </span>

                    </div>


                    <div>

                        <FaBuilding />

                        <span>

                            {profile.department}

                        </span>

                    </div>


                    <div>

                        <FaMapMarkerAlt />

                        <span>

                            {profile.serviceArea}

                        </span>

                    </div>


                    <div>

                        <FaMapMarkerAlt />

                        <span>

                            {profile.state}

                        </span>

                    </div>


                    <div>

                        <FaMapMarkerAlt />

                        <span>

                            {profile.address}

                        </span>

                    </div>


                    <div>

                        <FaMapMarkerAlt />

                        <span>

                            {profile.pincode}

                        </span>

                    </div>

                </div>

            </div>



            {/* Statistics Card */}

            <div className="statistics-card">

                <h2>Complaint Statistics</h2>

                <div className="stats-container">

                    <div className="stat-box">

                        <h1>

                            {profile.totalAssignedComplaints}

                        </h1>

                        <p>Assigned</p>

                    </div>


                    <div className="stat-box">

                        <h1>

                            {profile.totalResolvedComplaints}

                        </h1>

                        <p>Resolved</p>

                    </div>


                    <div className="stat-box">

                        <h1>

                            {profile.totalInProgressComplaints}

                        </h1>

                        <p>In Progress</p>

                    </div>


                    <div className="stat-box">

                        <h1>

                            {pendingComplaints}

                        </h1>

                        <p>Pending</p>

                    </div>

                </div>

            </div>



            {/* Performance Card */}

            <div className="performance-card">

                <h2>Work Performance</h2>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{

                            width: `${performancePercentage}%`

                        }}
                    >

                        {performancePercentage}%

                    </div>

                </div>

                <p>

                    Successfully completed

                    {" "}

                    {performancePercentage}%

                    {" "}

                    of assigned complaints.

                </p>

            </div>



            {/* Action Buttons */}

            <div className="action-buttons">

                <button className="update-btn">

                    Update Profile

                </button>


                <button
                    className="password-btn"
                    onClick={() =>
                        navigate("/officer/change-password")
                    }
                >
                    Change Password
                </button>


                <button
                    className="logout-btn"
                    onClick={HandleLogout}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Profile;