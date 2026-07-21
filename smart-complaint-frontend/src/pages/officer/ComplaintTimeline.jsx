import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OfficerService from "../../services/OfficerService";
import "./ComplaintTimeline.css";

function ComplaintTimeline() {

    const { complaintId } = useParams();

    const [timeline, setTimeline] = useState([]);

    useEffect(() => {

        LoadTimeline();

    }, []);

    const LoadTimeline = async () => {

        try {

            const data =
                await OfficerService
                    .GetComplaintTimeline(complaintId);

            setTimeline(data);

        }

        catch (error) {

            console.error(error);

        }

    };


    const hasBeforeWork =
        timeline.some(
            item => item.stage === "BeforeWork"
        );

    const hasDuringWork =
        timeline.some(
            item => item.stage === "DuringWork"
        );

    const hasAfterWork =
        timeline.some(
            item => item.stage === "AfterWork"
        );


    return (

        <div className="timeline-container">

            <h1>Complaint Work Timeline</h1>


            {/* Complaint Progress */}

            <div className="complaint-progress">

                <div className="progress-step active">
                    <div className="circle">1</div>
                    <p>Complaint Submitted</p>
                </div>

                <div
                    className={`line ${timeline.length >= 0 ? "active-line" : ""}`}
                ></div>

                <div className="progress-step active">
                    <div className="circle">2</div>
                    <p>Complaint Assigned</p>
                </div>

                <div
                    className={`line ${hasBeforeWork ? "active-line" : ""}`}
                ></div>

                <div
                    className={`progress-step ${hasBeforeWork ? "active" : ""}`}
                >
                    <div className="circle">3</div>
                    <p>Work Started</p>
                </div>

                <div
                    className={`line ${hasDuringWork ? "active-line" : ""}`}
                ></div>

                <div
                    className={`progress-step ${hasDuringWork ? "active" : ""}`}
                >
                    <div className="circle">4</div>
                    <p>Work In Progress</p>
                </div>

                <div
                    className={`line ${hasAfterWork ? "active-line" : ""}`}
                ></div>

                <div
                    className={`progress-step ${hasAfterWork ? "active" : ""}`}
                >
                    <div className="circle">5</div>
                    <p>Resolved</p>
                </div>

            </div>



            {
                timeline.length === 0 ?

                    (

                        <h3>No Images Uploaded Yet.</h3>

                    )

                    :

                    timeline.map((item, index) => (

                        <div
                            className="timeline-card"
                            key={index}
                        >

                            <h2>
                                {item.stage}
                            </h2>

                            <img
                                src={`https://localhost:7124${item.imagePath}`}
                                alt={item.stage}
                            />

                            <p>

                                <strong>
                                    Latitude :
                                </strong>

                                {item.latitude}

                            </p>

                            <p>

                                <strong>
                                    Longitude :
                                </strong>

                                {item.longitude}

                            </p>

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

    );

}

export default ComplaintTimeline;