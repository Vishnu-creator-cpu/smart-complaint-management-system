import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminService from "../../services/AdminService";
import "./UpdateStatus.css";

function UpdateStatus() {

    const [complaints, setComplaints] = useState([]);

    const [statusData, setStatusData] = useState({
        complaintId: "",
        statusId: "",
        remarks: ""
    });

    const statuses = [
        { id: 1, name: "Submitted" },
        { id: 2, name: "Assigned" },
        { id: 3, name: "In Progress" },
        { id: 4, name: "Completed" },
        { id: 5, name: "Rejected" },
        { id: 6, name: "Resolved" }
    ];


    useEffect(() => {

        FetchComplaints();

    }, []);


    const FetchComplaints = async () => {

        const data =
            await AdminService.GetAllComplaints();

        setComplaints(data);

    };


    const HandleChange = (e) => {

        setStatusData({

            ...statusData,

            [e.target.name]: e.target.value

        });

    };


    const HandleSubmit = async (e) => {

        e.preventDefault();

        const result =
            await AdminService.UpdateComplaintStatus(
                statusData
            );

        Swal.fire({
            icon: "success",
            title: "Success",
            text: result,
            confirmButtonText: "OK"
        });

    };


    return (

        <div className="status-container">

            <h2>Update Complaint Status</h2>

            <form
                className="status-form"
                onSubmit={HandleSubmit}
            >

                <div className="form-group">

                    <label>Complaint</label>

                    <select
                        name="complaintId"
                        onChange={HandleChange}
                        required
                    >

                        <option value="">
                            Select Complaint
                        </option>

                        {

                            complaints.map((c) => (

                                <option
                                    key={c.complaintId}
                                    value={c.complaintId}
                                >
                                    {c.complaintNumber}
                                </option>

                            ))

                        }

                    </select>

                </div>


                <div className="form-group">

                    <label>Status</label>

                    <select
                        name="statusId"
                        onChange={HandleChange}
                        required
                    >

                        <option value="">
                            Select Status
                        </option>

                        {

                            statuses.map((s) => (

                                <option
                                    key={s.id}
                                    value={s.id}
                                >
                                    {s.name}
                                </option>

                            ))

                        }

                    </select>

                </div>


                <div className="form-group">

                    <label>Remarks</label>

                    <input
                        type="text"
                        name="remarks"
                        onChange={HandleChange}
                    />

                </div>


                <button
                    type="submit"
                    className="status-btn"
                >
                    Update Status
                </button>

            </form>

        </div>

    );

}

export default UpdateStatus;