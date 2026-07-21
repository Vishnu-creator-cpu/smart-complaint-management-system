import { useState } from "react";
import { FaBell } from "react-icons/fa";
import "./NotificationBell.css";

function NotificationBell() {

    const [open, setOpen] = useState(false);

    const notifications = [

        "Complaint Assigned",
        "Complaint Resolved",
        "Status Updated"

    ];

    return (

        <div className="notification-wrapper">

            <div
                className="notification-icon"
                onClick={() => setOpen(!open)}
            >

                <FaBell />

                <span>3</span>

            </div>


            {

                open && (

                    <div className="notification-dropdown">

                        <h3>Notifications</h3>

                        {

                            notifications.map(
                                (item, index) => (

                                    <p key={index}>

                                        {item}

                                    </p>

                                )
                            )

                        }

                    </div>

                )

            }

        </div>

    );

}

export default NotificationBell;