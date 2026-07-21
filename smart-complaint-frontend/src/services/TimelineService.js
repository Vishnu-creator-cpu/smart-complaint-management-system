import axios from "axios";

const API_URL = "https://localhost:7124/api/Officer";

const token = () => localStorage.getItem("token");


const GetTimeline = async (complaintId) => {

    const response = await axios.get(

        `${API_URL}/Timeline/${complaintId}`,

        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    );

    return response.data;

};

export default {

    GetTimeline

};