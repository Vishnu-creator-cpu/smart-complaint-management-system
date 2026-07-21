import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginService from "../../services/LoginService";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const HandleChange = (e) => {

        setLoginData({

            ...loginData,

            [e.target.name]: e.target.value

        });

    };

    const HandleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await LoginService.Login(loginData);
            console.log(response);

            if (response.success) {

                localStorage.clear();

                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role);

                await Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Login Successful",
                    confirmButtonText: "OK"
                });

                if (response.role === "Admin") {

                    navigate("/admin/dashboard");

                }
                else if (response.role === "Officer") {

                    navigate("/officer/dashboard");

                }
                else {

                    navigate("/dashboard");

                }

            }
            else {

                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: response.message,
                    confirmButtonText: "OK"
                });

            }

        }
        catch (error) {

            console.error("Login Error:", error);

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Something went wrong. Please try again.",
                confirmButtonText: "OK"
            });

        }
    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <h2>Welcome Back 👋</h2>

                    <p>

                        Login to Smart Complaint Management System

                    </p>

                </div>

                <form
                    className="login-form"
                    onSubmit={HandleLogin}
                >

                    <div className="input-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={HandleChange}
                            required
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={HandleChange}
                            required
                        />

                    </div>

                    <div className="login-options">

                        <label className="remember">

                            <input type="checkbox" />

                            <span>Remember Me</span>

                        </label>

                        <Link
                            to="/forgot-password"
                            className="forgot-link"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >

                        Login

                    </button>

                </form>

                <div className="login-footer">

                    <span>

                        Don't have an account?

                    </span>

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;