import { useNavigate } from "react-router-dom";

import {
    FaPlusCircle,
    FaSearch,
    FaClipboardList,
    FaUser
}
from "react-icons/fa";

import "./QuickActions.css";

function QuickActions() {

    const navigate = useNavigate();

    return (

        <div className="quick-actions-card">

            <h2>Quick Actions</h2>

            <div className="quick-actions-grid">

                <button
                    onClick={() =>
                        navigate(
                            "/dashboard/register-complaint"
                        )
                    }
                >
                    <FaPlusCircle />
                    Register Complaint
                </button>


                <button
                    onClick={() =>
                        navigate(
                            "/dashboard/track-complaint"
                        )
                    }
                >
                    <FaSearch />
                    Track Complaint
                </button>


                <button
                    onClick={() =>
                        navigate(
                            "/dashboard/my-complaints"
                        )
                    }
                >
                    <FaClipboardList />
                    My Complaints
                </button>


                <button
                    onClick={() =>
                        navigate(
                            "/dashboard/profile"
                        )
                    }
                >
                    <FaUser />
                    View Profile
                </button>

            </div>

        </div>

    );

}

export default QuickActions;