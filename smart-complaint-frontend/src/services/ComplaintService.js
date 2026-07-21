import axios from "axios";

const API_URL = "https://localhost:7124/api/Complaint";

const RegisterComplaint = async (formData) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/Register`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

const GetMyComplaints = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/MyComplaints`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

const TrackComplaint = async (complaintNumber) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `${API_URL}/Status/${complaintNumber}`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};
const GetTimeline = async (complaintId) => {

    const response = await axios.get(

        `${API_URL}/Timeline/${complaintId}`,

        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }

    );

    return response.data;

};

export default {

    RegisterComplaint,

    GetMyComplaints,

    TrackComplaint,

    GetTimeline

};