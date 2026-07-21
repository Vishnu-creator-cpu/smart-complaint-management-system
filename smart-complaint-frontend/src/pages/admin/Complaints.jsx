import { useEffect, useState } from "react";
import AdminService from "../../services/AdminService";
import "./Complaints.css";

function Complaints() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        FetchComplaints();

    }, []);


    const FetchComplaints = async () => {

        const data = await AdminService.GetAllComplaints();

        setComplaints(data);

    };


    return (

        <div className="complaints-container">

            <h1>All Complaints</h1>

            <table className="complaints-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Citizen</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        complaints.map((item) => (

                            <tr key={item.complaintId}>

                                <td>{item.complaintId}</td>

                                <td>{item.complaintNumber}</td>

                                <td>{item.complaintTitle}</td>

                                <td>{item.citizenName}</td>

                                <td>{item.category}</td>

                                <td>{item.status}</td>

                                <td>{item.createdAt}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Complaints;