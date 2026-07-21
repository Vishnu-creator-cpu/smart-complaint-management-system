import "./ComplaintTimeline.css";

function ComplaintTimeline() {

    const timeline = [

        "Complaint Submitted",
        "Complaint Assigned",
        "Work Started",
        "Resolved"

    ];

    return (

        <div className="timeline-card">

            <h2>Complaint Progress</h2>

            <div className="timeline">

                {

                    timeline.map((item, index) => (

                        <div
                            className="timeline-item"
                            key={index}
                        >

                            <div className="timeline-circle">

                                {index + 1}

                            </div>

                            <p>{item}</p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ComplaintTimeline;