import { useEffect, useState } from "react";
import ProfileService from "../../services/ProfileService";
import "./Profile.css";

function Profile() {

    const [profile, setProfile] = useState(null);


    useEffect(() => {

        FetchProfile();

    }, []);


    const FetchProfile = async () => {

        const data = await ProfileService.GetProfile();

        setProfile(data);

    };


    if (!profile) {

        return <h2>Loading...</h2>;

    }


    return (

        <div className="profile-container">

            <h1>Admin Profile</h1>

            <div className="profile-card">

                <p>

                    <strong>User ID :</strong>

                    {profile.userId}

                </p>


                <p>

                    <strong>Name :</strong>

                    {profile.fullName}

                </p>


                <p>

                    <strong>Email :</strong>

                    {profile.email}

                </p>


                <p>

                    <strong>Role :</strong>

                    {profile.role}

                </p>


            </div>

        </div>

    );

}

export default Profile;