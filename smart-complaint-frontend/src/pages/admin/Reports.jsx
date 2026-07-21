import { useState } from "react";
import AdminService from "../../services/AdminService";
import "./Reports.css";


function Reports() {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reports, setReports] = useState([]);

    const HandleSearch = async () => {

        const data = await AdminService
            .GetComplaintsByDate(fromDate, toDate);

        setReports(data);

    };

    return (

        <div className="reports-container">

            <h1>Reports</h1>

            <div className="date-filter">

                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) =>
                        setFromDate(e.target.value)}
                />

                <input
                    type="date"
                    value={toDate}
                    onChange={(e) =>
                        setToDate(e.target.value)}
                />

                <button
                    onClick={HandleSearch}
                >
                    Search
                </button>

            </div>


            <table className="reports-table">

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

                        reports.map((item) => (

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

export default Reports;