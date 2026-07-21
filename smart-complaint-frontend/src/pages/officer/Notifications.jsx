import { useEffect, useState } from "react";
import OfficerService from "../../services/OfficerService";
import "./Notifications.css";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        LoadNotifications();

    }, []);


    const LoadNotifications = async () => {

        try {

            const data =
                await OfficerService.GetNotifications();

            setNotifications(data);

        }

        catch (error) {

            console.error(error);

        }

    };


    return (

        <div className="notification-container">

            <h1>
                Notifications
            </h1>

            {

                notifications.length === 0 ?

                    (

                        <p>

                            No Notifications Found.

                        </p>

                    )

                    :

                    notifications.map((item) => (

                        <div
                            className="notification-card"
                            key={item.notificationId}
                        >

                            <h3>
                                {item.title}
                            </h3>

                            <p>
                                {item.message}
                            </p>

                            <span>

                                {
                                    new Date(
                                        item.createdAt
                                    ).toLocaleString()
                                }

                            </span>

                        </div>

                    ))

            }

        </div>

    );

}

export default Notifications;