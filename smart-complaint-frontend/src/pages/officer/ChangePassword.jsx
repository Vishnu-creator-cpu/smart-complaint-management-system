import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OfficerService from "../../services/OfficerService";
import "./ChangePassword.css";

function ChangePassword() {

    const navigate = useNavigate();

    const [passwordData, setPasswordData] = useState({

        currentPassword: "",
        newPassword: "",
        confirmPassword: ""

    });

    const HandleChange = (e) => {

        setPasswordData({

            ...passwordData,
            [e.target.name]: e.target.value

        });

    };


    const HandleSubmit = async (e) => {

        e.preventDefault();

        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {

            Swal.fire({
                icon: "warning",
                title: "Password Mismatch",
                text: "Passwords do not match.",
                confirmButtonText: "OK"
            });

            return;

        }

        try {

            const result =
                await OfficerService.ChangePassword(
                    passwordData
                );

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: result,
                confirmButtonText: "OK"
            });

            navigate("/officer/profile");

        }

        catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to change password.",
                confirmButtonText: "OK"
            });

        }

    };


    return (

        <div className="change-password-container">

            <div className="change-password-card">

                <h1>Change Password</h1>

                <form onSubmit={HandleSubmit}>

                    <div className="input-group">

                        <label>Current Password</label>

                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={HandleChange}
                            required
                        />

                    </div>


                    <div className="input-group">

                        <label>New Password</label>

                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={HandleChange}
                            required
                        />

                    </div>


                    <div className="input-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={HandleChange}
                            required
                        />

                    </div>


                    <div className="button-group">

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Change Password
                        </button>


                        <button
                            type="button"
                            className="back-btn"
                            onClick={() =>
                                navigate("/officer/profile")
                            }
                        >
                            Back
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ChangePassword;