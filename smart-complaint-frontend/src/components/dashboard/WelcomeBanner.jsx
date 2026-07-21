import "./WelcomeBanner.css";

function WelcomeBanner({ userName }) {

    return (

        <div className="welcome-banner">

            <div className="welcome-content">

                <h1>
                    Welcome Back, {userName} 👋
                </h1>

                <p>
                    Track and manage your complaints easily.
                    We're here to help you.
                </p>

            </div>

        </div>

    );

}

export default WelcomeBanner;