import { useState } from "react";
import Swal from "sweetalert2";
import ComplaintService from "../../../services/ComplaintService";
import "./TrackComplaint.css";

function TrackComplaint() {

    const [complaintNumber, setComplaintNumber] = useState("");
    const [complaint, setComplaint] = useState(null);
    const [timeline, setTimeline] = useState([]);

    const [progress, setProgress] = useState({
        submitted: false,
        assigned: false,
        inProgress: false,
        resolved: false
    });

    const [completionPercentage, setCompletionPercentage] = useState(0);

    const SearchComplaint = async () => {

        try {

            const data =
                await ComplaintService.TrackComplaint(
                    complaintNumber
                );

            setComplaint(data);

            const timelineData =
                await ComplaintService.GetTimeline(
                    data.complaintId
                );

            setTimeline(timelineData);


            let complaintProgress = {

                submitted: true,
                assigned: false,
                inProgress: false,
                resolved: false

            };


            // Assigned

            if (

                data.currentStatus === "Assigned" ||

                data.currentStatus === "In Progress" ||

                data.currentStatus === "Resolved"

            ) {

                complaintProgress.assigned = true;

            }


            // In Progress

            if (

                timelineData.some(

                    item =>

                        item.stage === "BeforeWork" ||

                        item.stage === "DuringWork"

                )

            ) {

                complaintProgress.inProgress = true;

            }


            // Resolved

            if (

                data.currentStatus === "Resolved"

            ) {

                complaintProgress.resolved = true;

            }

            setProgress(complaintProgress);

            let completedSteps = 0;

            if (complaintProgress.submitted) completedSteps++;
            if (complaintProgress.assigned) completedSteps++;
            if (complaintProgress.inProgress) completedSteps++;
            if (complaintProgress.resolved) completedSteps++;

            setCompletionPercentage((completedSteps / 4) * 100);

        }

        catch {

            Swal.fire({

                icon: "error",
                title: "Complaint Not Found",
                text: "Please check the complaint number.",
                confirmButtonText: "OK"

            });

            setComplaint(null);
            setTimeline([]);

            setProgress({

                submitted: false,
                assigned: false,
                inProgress: false,
                resolved: false

            });
            setTimeline([]);

            setCompletionPercentage(0);

            setProgress({
                submitted: false,
                assigned: false,
                inProgress: false,
                resolved: false
            });

        }

    };


    return (

        <div className="track-container">

            {/* Search Card */}

            <div className="track-card">

                <h2>Track Complaint</h2>

                <div className="search-box">

                    <input

                        type="text"
                        placeholder="Enter Complaint Number"

                        value={complaintNumber}

                        onChange={(e) =>
                            setComplaintNumber(e.target.value)
                        }

                    />

                    <button onClick={SearchComplaint}>

                        Search

                    </button>

                </div>


                {

                    complaint && (

                        <div className="result-card">

                            <h3>

                                {complaint.complaintTitle}

                            </h3>

                            <p>

                                <strong>
                                    Complaint No :
                                </strong>

                                {complaint.complaintNumber}

                            </p>

                            <p>

                                <strong>
                                    Status :
                                </strong>

                                {complaint.currentStatus}

                            </p>

                            <p>

                                <strong>
                                    Last Updated :
                                </strong>

                                {

                                    new Date(

                                        complaint.lastUpdated

                                    ).toLocaleString()

                                }

                            </p>

                        </div>

                    )

                }

            </div>



            {
                complaint && (

                    <div className="completion-card">

                        <h2>Complaint Completion</h2>

                        <h1>
                            {completionPercentage}%
                        </h1>


                        <div className="completion-bar">

                            <div
                                className="completion-fill"

                                style={{

                                    width:
                                        `${completionPercentage}%`

                                }}
                            >

                            </div>

                        </div>

                    </div>

                )
            }



            {/* Complaint Progress */}

            {

                complaint && (

                    <div className="status-container">

                        <h2>

                            Complaint Progress

                        </h2>


                        <div className="status-grid">

                            <div className="status-item">

                                <span>

                                    {
                                        progress.submitted
                                            ? "✓"
                                            : "○"
                                    }

                                </span>

                                <p>Submitted</p>

                            </div>


                            <div className="status-item">

                                <span>

                                    {
                                        progress.assigned
                                            ? "✓"
                                            : "○"
                                    }

                                </span>

                                <p>Assigned</p>

                            </div>


                            <div className="status-item">

                                <span>

                                    {
                                        progress.inProgress
                                            ? "✓"
                                            : "○"
                                    }

                                </span>

                                <p>In Progress</p>

                            </div>


                            <div className="status-item">

                                <span>

                                    {
                                        progress.resolved
                                            ? "✓"
                                            : "○"
                                    }

                                </span>

                                <p>Resolved</p>

                            </div>

                        </div>

                    </div>

                )

            }


            {/* Work Timeline */}

            {

                timeline.length > 0 && (

                    <div className="progress-container">

                        <h2>

                            Work Timeline

                        </h2>

                        {

                            timeline.map((item, index) => (

                                <div

                                    className="progress-card"

                                    key={index}

                                >

                                    <h3>

                                        {item.stage}

                                    </h3>


                                    {

                                        item.imagePath && (

                                            <img

                                                src={
                                                    `https://localhost:7124${item.imagePath}`
                                                }

                                                alt={item.stage}

                                            />

                                        )

                                    }


                                    <p>

                                        <strong>
                                            Address :
                                        </strong>

                                        {item.address}

                                    </p>


                                    <p>

                                        <strong>
                                            Uploaded :
                                        </strong>

                                        {

                                            new Date(

                                                item.uploadedAt

                                            ).toLocaleString()

                                        }

                                    </p>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default TrackComplaint;