import { useEffect, useState } from "react";
import ComplaintService from "../../../services/ComplaintService";
import "./MyComplaints.css";


function MyComplaints() {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        LoadComplaints();
    }, []);

    const LoadComplaints = async () => {

        try {

            const data =
                await ComplaintService.GetMyComplaints();

            console.log("MY COMPLAINT DATA:", data);

            setComplaints(data || []);

        }
        catch (error) {

            console.error(
                "MY COMPLAINT ERROR:",
                error.response?.data || error.message
            );

        }
        finally {

            setLoading(false);

        }
    };

    return (

        <div className="mycomplaints-container">

            <h2>My Complaints</h2>

            {loading ? (

                <p>Loading complaints...</p>

            ) : (

                <table>

                    <thead>

                        <tr>
                            <th>Complaint No</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>

                    </thead>

                    <tbody>

                        {complaints.length > 0 ? (

                            complaints.map((item) => (

                                <tr key={item.complaintId}>

                                    <td>
                                        {item.complaintNumber}
                                    </td>

                                    <td>
                                        {item.complaintTitle}
                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${item.status?.toLowerCase()}`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td>

                                        {item.createdAt
                                            ? new Date(
                                                item.createdAt
                                            ).toLocaleDateString()
                                            : "-"}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="4">

                                    No Complaints Found

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            )}

        </div>

    );
}

export default MyComplaints;