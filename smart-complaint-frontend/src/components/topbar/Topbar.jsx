import { FaBell, FaUserCircle } from "react-icons/fa";
import { GetUserName } from "../../utils/Helper";
import "./Topbar.css";

function Topbar() {

    const userName = GetUserName();

    return (

        <div className="topbar">

            <div className="topbar-left">

                <h1>Dashboard</h1>

                <p>Welcome back 👋</p>

            </div>

            <div className="topbar-right">

                <div className="user-profile">

                    <FaUserCircle className="user-icon" />

                    <div>

                        <h4>{userName}</h4>

                        <p>Citizen</p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Topbar;