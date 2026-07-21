import "./ComplaintHistory.css";

import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import OfficerService from "../../services/OfficerService";

function ComplaintHistory() {

    const { complaintId } = useParams();

    const navigate = useNavigate();

    const [history, setHistory] = useState(null);

    useEffect(() => {

        LoadComplaintHistory();

    }, []);

    const LoadComplaintHistory = async () => {

        try {

            const data = await OfficerService
                .GetComplaintHistory(complaintId);

            setHistory(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load history.",
                confirmButtonText: "OK"
            });

        }

    };

    if (!history) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="history-container">

            <h1>Complaint History</h1>

            <div className="history-card">

                <p>

                    <strong>Complaint Number :</strong>

                    {history.complaintNumber}

                </p>

                <p>

                    <strong>Title :</strong>

                    {history.complaintTitle}

                </p>

                <p>

                    <strong>Status :</strong>

                    {history.status}

                </p>

                <p>

                    <strong>Complaint Date :</strong>

                    {history.complaintDate}

                </p>

                <p>

                    <strong>Assigned Date :</strong>

                    {history.assignedDate}

                </p>

                <p>

                    <strong>Completed Date :</strong>

                    {history.completedDate}

                </p>

                <p>

                    <strong>Remarks :</strong>

                    {history.remarks}

                </p>

            </div>

            <h2>Work Images</h2>

            <div className="images-container">

                {

                    history.images.map((image) => (

                        <div
                            key={image.imagePath}
                            className="image-card"
                        >

                            <h3>

                                {image.imageType}

                            </h3>

                            <img

                                src={`https://localhost:7124${image.imagePath}`}

                                alt="Work"

                            />

                            <p>

                                Latitude :

                                {image.latitude}

                            </p>

                            <p>

                                Longitude :

                                {image.longitude}

                            </p>

                            <p>

                                Address :

                                {image.address}

                            </p>

                            <p>

                                Uploaded At :

                                {image.uploadedAt}

                            </p>

                        </div>

                    ))

                }

            </div>

            <button

                onClick={() =>
                    navigate("/officer/complaints")
                }

            >

                Back

            </button>

        </div>

    );

}

export default ComplaintHistory;