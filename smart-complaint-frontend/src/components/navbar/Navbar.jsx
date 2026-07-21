import { Link } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-logo">

                <img src={Logo} alt="Logo" />

                <span>Smart Complaint</span>

            </div>

            <ul className="navbar-links">

                <li>
                     <a href="/#Home">
                        Home
                    </a>
                </li>

                <li>
                    <a href="/#about">
                        About
                    </a>
                </li>

                <li>
                    <a href="/#contact">
                        Contact
                    </a>
                </li>

            </ul>

            <div className="navbar-buttons">

                <Link to="/login" className="login-btn">
                    Login
                </Link>

                <Link to="/register" className="register-btn">
                    Register
                </Link>

            </div>

        </nav>

    );
}

export default Navbar;