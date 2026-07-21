import { useEffect, useState } from "react";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaUser,
    FaIdBadge,
    FaUserShield,
    FaEdit
} from "react-icons/fa";

import Swal from "sweetalert2";

import ProfileService from "../../../services/ProfileService";

import "./Profile.css";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {

        LoadProfile();

    }, []);

    const LoadProfile = async () => {

        try {

            const data = await ProfileService.GetProfile();

            setProfile(data.data ?? data);

        }

        catch {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to load profile."

            });

        }

    };

    const HandleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const UpdateProfile = async () => {

        try {

            await ProfileService.UpdateProfile(profile);

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "Profile Updated Successfully."

            });

            setIsEditing(false);

        }

        catch {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to update profile."

            });

        }

    };

    if (!profile)

        return <h2 className="loading">Loading...</h2>;

    return (

        <div className="profile-page">

            <div className="profile-card">

                {/* Avatar */}

                <div className="avatar">

                    {profile.fullName?.charAt(0).toUpperCase()}

                </div>

                <h2 className="profile-name">

                    {profile.fullName}

                </h2>

                <p className="role">

                    Citizen

                </p>

                <div className="profile-content">

                    {/* Personal Information */}

                    <div className="profile-section">

                        <h3>Personal Information</h3>

                        <div className="info-row">

                            <span className="info-label">

                                <FaUser /> Full Name : 

                            </span>

                            <span className="info-value">

                                {

                                    isEditing ?

                                        <input

                                            type="text"

                                            name="fullName"

                                            value={profile.fullName}

                                            onChange={HandleChange}

                                        />

                                        :

                                        profile.fullName

                                }

                            </span>

                        </div>

                        <div className="info-row">

                            <span className="info-label">

                                <FaEnvelope /> Email : 

                            </span>

                            <span className="info-value">

                                {profile.email}

                            </span>

                        </div>

                        <div className="info-row">

                            <span className="info-label">

                                <FaPhoneAlt /> Phone : 

                            </span>

                            <span className="info-value">

                                {

                                    isEditing ?

                                        <input

                                            type="text"

                                            name="phoneNumber"

                                            value={profile.phoneNumber}

                                            onChange={HandleChange}

                                        />

                                        :

                                        profile.phoneNumber

                                }

                            </span>

                        </div>

                    </div>

                    {/* Account Information */}

                    <div className="profile-section">

                        <h3>Account Information</h3>

                        <div className="info-row">

                            <span className="info-label">

                                <FaIdBadge /> User ID : 

                            </span>

                            <span className="info-value">

                                {profile.userId}

                            </span>

                        </div>

                        <div className="info-row">

                            <span className="info-label">

                                <FaUserShield /> Role : 

                            </span>

                            <span className="info-value">

                                {profile.role}

                            </span>

                        </div>

                    </div>

                    {/* Address */}

                    <div className="profile-section">

                        <h3>Address</h3>

                        <div className="info-row">

                            <span className="info-label">

                                <FaMapMarkerAlt /> Address : 

                            </span>

                            <span className="info-value">

                                {

                                    isEditing ?

                                        <input

                                            type="text"

                                            name="address"

                                            value={profile.address}

                                            onChange={HandleChange}

                                        />

                                        :

                                        profile.address

                                }

                            </span>

                        </div>

                        <div className="info-row">

                            <span className="info-label">

                                District : 

                            </span>

                            <span className="info-value">

                                {

                                    isEditing ?

                                        <input

                                            type="text"

                                            name="district"

                                            value={profile.district}

                                            onChange={HandleChange}

                                        />

                                        :

                                        profile.district

                                }

                            </span>

                        </div>

                    </div>

                    {/* Location */}

                    <div className="profile-section">

                        <h3>Location</h3>

                        <div className="info-row">

                            <span className="info-label">

                                State : 

                            </span>

                            <span className="info-value">

                                {

                                    isEditing ?

                                        <input

                                            type="text"

                                            name="state"

                                            value={profile.state}

                                            onChange={HandleChange}

                                        />

                                        :

                                        profile.state

                                }

                            </span>

                        </div>

                        <div className="info-row">

                            <span className="info-label">

                                Pincode : 

                            </span>

                            <span className="info-value">

                                {

                                    isEditing ?

                                        <input

                                            type="text"

                                            name="pincode"

                                            value={profile.pincode}

                                            onChange={HandleChange}

                                        />

                                        :

                                        profile.pincode

                                }

                            </span>

                        </div>

                    </div>

                </div>

                <button

                    className="edit-btn"

                    onClick={() =>

                        isEditing

                            ? UpdateProfile()

                            : setIsEditing(true)

                    }

                >

                    <FaEdit />

                    {" "}

                    {

                        isEditing

                            ? "Save Changes"

                            : "Edit Profile"

                    }

                </button>

            </div>

        </div>

    );

}

export default Profile;