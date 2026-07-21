import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RegisterService from "../../services/RegisterService";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        phoneNumber: "",

        password: "",

        confirmPassword: "",

        address: "",

        district: "",

        state: "",

        pincode: ""

    });

    const HandleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const HandleRegister = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "Passwords do not match",
                confirmButtonText: "OK"
            });

            return;

        }

        const response = await RegisterService.Register({

            fullName: formData.fullName,

            email: formData.email,

            phoneNumber: formData.phoneNumber,

            password: formData.password,

            address: formData.address,

            district: formData.district,

            state: formData.state,

            pincode: formData.pincode

        });

        if (response.success) {

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: "Registration Successful",
                confirmButtonText: "OK"
            });

            navigate("/login");

        }
        else {

            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: response.message,
                confirmButtonText: "OK"
            });

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <h2>Create Account</h2>

                <p>Join Smart Complaint Management System</p>

                <form onSubmit={HandleRegister}>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={HandleChange}
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={HandleChange}
                        required
                    ></textarea>

                    <input
                        type="text"
                        name="district"
                        placeholder="District"
                        value={formData.district}
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={HandleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={HandleChange}
                        required
                    />

                    <button type="submit">

                        Register

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;