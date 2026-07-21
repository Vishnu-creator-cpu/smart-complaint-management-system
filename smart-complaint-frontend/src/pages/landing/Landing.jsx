import Navbar from "../../components/navbar/Navbar";
import "./Landing.css";
import HeroBg from "../../assets/backgrounds/hero-bg.jpg";
import FeatureCards from "../../components/cards/FeatureCards";

function Landing() {

    return (

        <>

            <Navbar />

            <section id="Home"
                className="hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(15,23,42,.75), rgba(15,23,42,.75)), url(${HeroBg})`
                }}
            >

                <div className="overlay">

                    <div className="hero-content">

                        <span className="hero-tag">
                            🇮🇳 Government Complaint Portal
                        </span>

                        <h1>
                            Smart Complaint
                            <br />
                            Management System
                        </h1>

                        <p>
                            Register, Track and Resolve Public Complaints
                            with a secure and transparent digital platform.
                        </p>

                    </div>

                </div>

            </section>

            <section id="about" className="about-section">

                <h2>About Smart Complaint Management System</h2>

                <p>
                    Smart Complaint Management System is an advanced digital platform
                    designed to simplify the process of registering, tracking, and
                    resolving public complaints efficiently. It provides a secure and
                    transparent environment where citizens can easily communicate their
                    issues with concerned authorities.
                </p>

                <p>
                    The system allows users to submit complaints online, upload supporting
                    images, track real-time complaint status, and receive timely updates
                    regarding their requests. It eliminates traditional paperwork and
                    reduces the delay in complaint processing.
                </p>

                <p>
                    Government officers can access assigned complaints, update resolution
                    progress, maintain complaint history, and manage citizen requests
                    effectively. The platform improves transparency, accountability, and
                    service quality by creating a better connection between citizens and
                    administration.
                </p>

                <p>
                    Smart Complaint Management System uses modern technologies to provide
                    a reliable, user-friendly, and responsive experience. The system
                    supports role-based access for users, officers, and administrators,
                    ensuring secure management of complaint activities.
                </p>

                <div className="about-features">

                    <h3>Key Features</h3>

                    <div className="feature-grid">

                        <div className="feature-card">
                            Online Complaint Registration & Tracking
                        </div>

                        <div className="feature-card">
                            Real-Time Complaint Status Updates
                        </div>

                        <div className="feature-card">
                            Image Upload Support for Complaint Evidence
                        </div>

                        <div className="feature-card">
                            Secure User Authentication & Role Management
                        </div>

                        <div className="feature-card">
                            Complaint History & Resolution Monitoring
                        </div>

                        <div className="feature-card">
                            Email Notifications for Important Updates
                        </div>

                    </div>

                </div>

            </section>



            <section id="contact" className="contact-section">

                <h2>Contact Us</h2>

                <p>
                    Have questions, feedback, or need assistance with your complaint?
                    Our dedicated support team is available to guide you and provide
                    quick solutions for your queries.
                </p>

                <p>
                    We value citizen feedback and continuously work towards improving
                    the complaint management experience. You can reach us through the
                    following communication channels.
                </p>


                <div className="contact-details">

                    <div className="contact-card">
                        <h3>Email Support</h3>
                        <p>support@smartcomplaint.com</p>
                    </div>

                    <div className="contact-card">
                        <h3>Phone Number</h3>
                        <p>+91 98765 43210</p>
                    </div>

                    <div className="contact-card">
                        <h3>Office Address</h3>
                        <p>
                            Smart Complaint Management System<br />
                            Government Service Center<br />
                            Tamil Nadu, India
                        </p>
                    </div>

                    <div className="contact-card">
                        <h3>Working Hours</h3>
                        <p>Monday - Friday<br />9:00 AM - 5:00 PM</p>
                    </div>

                    <div className="contact-card">
                        <h3>Support Services</h3>
                        <p>
                            Complaint Assistance<br />
                            Technical Support<br />
                            Account Related Queries<br />
                            Feedback Management
                        </p>
                    </div>

                </div>


                <div className="contact-message">

                    <h3>We Are Here To Help</h3>

                    <p>
                        Your complaints help us identify problems and improve public
                        services. Submit your concerns through our platform and stay
                        connected with the resolution process.
                    </p>

                </div>

            </section>

            <FeatureCards />

        </>

    );

}

export default Landing;