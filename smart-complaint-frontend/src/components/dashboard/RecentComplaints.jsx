import { useNavigate } from "react-router-dom";
import "./RecentComplaints.css";

function RecentComplaints({ complaints }) {

    const navigate = useNavigate();

    return (

        <div className="recent-complaints-card">

            <h2>Recent Complaints</h2>

            {
                complaints.length === 0 ? (

                    <p>No complaints found.</p>

                ) : (

                    complaints.map((item) => (

                        <div
                            className="recent-item"
                            key={item.complaintId}
                        >

                            <div>

                                <h4>
                                    {item.complaintNumber}
                                </h4>

                                <p>
                                    {item.status}
                                </p>

                            </div>

                            <button

                                onClick={() =>
                                    navigate(
                                        "/dashboard/my-complaints"
                                    )
                                }

                            >
                                View

                            </button>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default RecentComplaints;