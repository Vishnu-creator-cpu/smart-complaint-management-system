import {
    FaClipboardList,
    FaSearchLocation,
    FaCheckCircle
} from "react-icons/fa";

import "./FeatureCards.css";

function FeatureCards() {

    const features = [

        {
            icon: <FaClipboardList />,
            title: "Register Complaint",
            description:
                "Submit complaints online with images and location."
        },

        {
            icon: <FaSearchLocation />,
            title: "Track Status",
            description:
                "Track every stage of your complaint in real time."
        },

        {
            icon: <FaCheckCircle />,
            title: "Quick Resolution",
            description:
                "Officers resolve complaints efficiently with transparency."
        }

    ];

    return (

        <section className="features">

            <h2>Why Choose Smart Complaint?</h2>

            <div className="feature-container">

                {
                    features.map((item, index) => (

                        <div
                            className="feature-card"
                            key={index}
                        >

                            <div className="feature-icon">

                                {item.icon}

                            </div>

                            <h3>{item.title}</h3>

                            <p>{item.description}</p>

                        </div>

                    ))
                }

            </div>

        </section>

    );

}

export default FeatureCards;