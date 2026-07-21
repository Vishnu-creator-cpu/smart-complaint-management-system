import axios from "axios";

const API_URL = "https://localhost:7124/api/User";

const token = () => localStorage.getItem("token");

const GetProfile = async () => {
    const response = await axios.get(`${API_URL}/Profile`, {
        headers: {
            Authorization: `Bearer ${token()}`
        }
    });

    return response.data;
};

const ProfileService = {
    GetProfile
};

const UpdateProfile = async (profile) => {

    const response = await axios.put(
        `${API_URL}/Profile`,
        profile,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        });

    return response.data;
};

ProfileService.UpdateProfile = UpdateProfile;

export default {
    GetProfile,
    UpdateProfile
};