import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OfficerService from "../../services/OfficerService";
import "./AssignedComplaints.css";
import GenerateComplaintPDF from "../../utils/PDFGenerator";

function AssignedComplaints() {

    const { complaintId } = useParams();

    const navigate = useNavigate();

    const [complaint, setComplaint] = useState(null);
    const [remarks, setRemarks] = useState("");


    useEffect(() => {

        LoadComplaintDetails();

    }, [complaintId]);


    const LoadComplaintDetails = async () => {

        try {

            const data =
                await OfficerService.GetComplaintDetails(complaintId);

            setComplaint(data);

        }
        catch (error) {

            console.error("Complaint Details Error:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load complaint details.",
                confirmButtonText: "OK"
            });

        }

    };


    if (!complaint) {

        return <h2>Loading Complaint...</h2>;

    }

    const HandleCompleteComplaint = async () => {

        if (!remarks) {

            Swal.fire({
                icon: "warning",
                title: "Remarks Required",
                text: "Please enter remarks.",
                confirmButtonText: "OK"
            });

            return;

        }

        try {

            const data = {

                complaintId: complaint.complaintId,
                remarks: remarks

            };

            const result =
                await OfficerService.CompleteComplaint(data);

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: result,
                confirmButtonText: "OK"
            });

            navigate("/officer/complaints");

        }

        catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to complete complaint.",
                confirmButtonText: "OK"
            });

        }

    };


    return (

        <div className="officer-complaint-details">

            <h1>Complaint Details</h1>

            <div className="complaint-details-card">

                <p>
                    <strong>Complaint Number:</strong>{" "}
                    {complaint.complaintNumber}
                </p>

                <p>
                    <strong>Title:</strong>{" "}
                    {complaint.complaintTitle}
                </p>

                <p>
                    <strong>Description:</strong>{" "}
                    {complaint.complaintDescription}
                </p>

                <p>
                    <strong>Citizen:</strong>{" "}
                    {complaint.citizenName}
                </p>

                <p>
                    <strong>Category:</strong>{" "}
                    {complaint.category}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {complaint.status}
                </p>

                <p>
                    <strong>Address:</strong>{" "}
                    {complaint.address}
                </p>

                <p>
                    <strong>District:</strong>{" "}
                    {complaint.district}
                </p>

                <p>
                    <strong>State:</strong>{" "}
                    {complaint.state}
                </p>

                <p>
                    <strong>Pincode:</strong>{" "}
                    {complaint.pincode}
                </p>

                <p>
                    <strong>Latitude:</strong>{" "}
                    {complaint.latitude}
                </p>

                <p>
                    <strong>Longitude:</strong>{" "}
                    {complaint.longitude}
                </p>

                <div className="location-container">

                    <a
                        href={`https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="location-btn"
                    >

                        View Complaint Location

                    </a>

                </div>

                {complaint.complaintImage && (

                    <div>

                        <h3>Complaint Image</h3>

                        <img
                            src={`https://localhost:7124${complaint.complaintImage}`}
                            alt="Complaint"
                            className="complaint-detail-image"
                        />

                    </div>

                )}

                <div className="remarks-container">

                    <label>

                        <strong>Work Completion Remarks</strong>

                    </label>

                    <textarea

                        rows="5"

                        value={remarks}

                        onChange={(e) =>
                            setRemarks(e.target.value)
                        }

                        placeholder="Enter detailed remarks about the completed work"

                    />

                </div>

                <br />

                <div className="action-buttons">

                    <button
                        className="pdf-btn"
                        onClick={() =>
                            GenerateComplaintPDF(complaint)
                        }
                    >
                        Download PDF Report
                    </button>

                    <button
                        className="upload-btn"
                        onClick={() =>
                            navigate(
                                `/officer/upload/${complaint.complaintId}`
                            )
                        }
                    >
                        Upload Work Images
                    </button>

                    <button
                        className="complete-btn"
                        onClick={HandleCompleteComplaint}
                    >
                        Complete Complaint
                    </button>

                    <button

                        className="history-btn"

                        onClick={() =>

                            navigate(

                                `/officer/history/${complaint.complaintId}`

                            )}

                    >

                        View History

                    </button>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate("/officer/complaints")
                        }
                    >
                        Back
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AssignedComplaints;