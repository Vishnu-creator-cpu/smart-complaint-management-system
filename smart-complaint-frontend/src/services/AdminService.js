import axios from "axios";

const API_URL = "https://localhost:7124/api/Admin";

// Dashboard
const GetDashboard = async () => {
    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${API_URL}/dashboard`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error("Dashboard API Error:", error);

        return null;
    }
};


// Get All Complaints
const GetAllComplaints = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${API_URL}/complaints`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error("Complaint API Error :", error);

        return [];

    }
};


// Same API for Assign Complaint page
const GetComplaints = async () => {

    return await GetAllComplaints();

};


// Get Officers
const GetOfficers = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${API_URL}/officers`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error("Officer API Error :", error);

        return [];

    }

};


// Assign Complaint
const AssignComplaint = async (data) => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.post(
            `${API_URL}/assign`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error("Assign Complaint Error :", error);

        return "Failed to assign complaint.";

    }

};

const UpdateComplaintStatus = async (data) => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.put(

            `${API_URL}/update-status`,

            data,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        return response.data;

    }

    catch (error) {

        console.error(error);

        return "Status update failed.";

    }

};
const GetComplaintsByDate = async (from, to) => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(

            `${API_URL}/complaints/date?from=${from}&to=${to}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        return response.data;

    }

    catch (error) {

        console.error("Reports API Error :", error);

        return [];

    }

};


export default {

    GetDashboard,
    GetAllComplaints,
    GetComplaints,
    GetOfficers,
    AssignComplaint,
    UpdateComplaintStatus,
    GetComplaintsByDate

};