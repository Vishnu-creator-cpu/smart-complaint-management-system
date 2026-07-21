import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminService from "../../services/AdminService";
import "./AssignComplaint.css";

function AssignComplaint() {

    const [complaints, setComplaints] = useState([]);
    const [officers, setOfficers] = useState([]);

    const [assignData, setAssignData] = useState({
        complaintId: "",
        officerId: "",
        remarks: ""
    });


    useEffect(() => {

        fetchData();

    }, []);


    const fetchData = async () => {

        const complaintData =
            await AdminService.GetAllComplaints();

        const officerData =
            await AdminService.GetOfficers();

        setComplaints(complaintData);
        setOfficers(officerData);

    };


    const handleChange = (e) => {

        setAssignData({

            ...assignData,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        const result =
            await AdminService.AssignComplaint(assignData);

        Swal.fire({
            icon: "success",
            title: "Success",
            text: result,
            confirmButtonText: "OK"
        });

    };


    return (

        <div className="assign-container">

            <h2>Assign Complaint</h2>

            <form
                className="assign-form"
                onSubmit={handleSubmit}
            >


                <div className="form-group">

                    <label>Complaint</label>

                    <select
                        name="complaintId"
                        onChange={handleChange}
                        required>

                        <option value="">
                            Select Complaint
                        </option>

                        {
                            complaints.map((c) => (

                                <option
                                    key={c.complaintId}
                                    value={c.complaintId}>

                                    {c.complaintNumber}

                                </option>

                            ))
                        }

                    </select>

                </div>


                <br />


                <div className="form-group">

                    <label>Officer</label>

                    <select
                        name="officerId"
                        onChange={handleChange}
                        required>

                        <option value="">
                            Select Officer
                        </option>

                        {
                            officers.map((o) => (

                                <option
                                    key={o.officerId}
                                    value={o.officerId}>

                                    {o.fullName}

                                </option>

                            ))
                        }

                    </select>

                </div>


                <br />


                <div className="form-group">

                    <label>Remarks</label>

                    <input
                        type="text"
                        name="remarks"
                        onChange={handleChange}
                    />

                </div>


                <br />

                <button
                    type="submit"
                    className="assign-btn"
                >

                    Assign Complaint

                </button>

            </form>

        </div>

    );

}

export default AssignComplaint;