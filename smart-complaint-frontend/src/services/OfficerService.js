import axios from "axios";

const API_URL = "https://localhost:7124/api/Officer";

const token = () => localStorage.getItem("token");

const GetAuthHeader = () => {

    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

};

// My Complaints

const GetMyComplaints = async () => {

    const response = await axios.get(
        `${API_URL}/MyComplaints`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    );

    return response.data;
};


// Complaint Details

const GetComplaintDetails = async (id) => {

    const response = await axios.get(
        `${API_URL}/Complaint/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    );

    return response.data;
};


// Upload Before Work

const UploadBeforeWork = async (formData) => {

    const response = await axios.post(
        `${API_URL}/UploadBeforeWork`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    );

    return response.data;
};


// Upload During Work

const UploadDuringWork = async (formData) => {

    const response = await axios.post(
        `${API_URL}/UploadDuringWork`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    );

    return response.data;
};


// Upload After Work

const UploadAfterWork = async (formData) => {

    const response = await axios.post(
        `${API_URL}/UploadAfterWork`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`
            }
        }
    );

    return response.data;
};
// Complete Complaint

const CompleteComplaint = async (data) => {

    const response = await axios.post(
        `${API_URL}/CompleteComplaint`,
        data,
        GetAuthHeader()
    );

    return response.data;

};

const GetProfile = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(

        `${API_URL}/Profile`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};

const GetNotifications = async () => {

    const response = await axios.get(
        `${API_URL}/Notifications`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    return response.data;
};

const GetComplaintTimeline = async (complaintId) => {

    const response = await axios.get(
        `https://localhost:7124/api/Officer/Timeline/${complaintId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    return response.data;
};

const ChangePassword = async (data) => {

    const response = await axios.put(

        `${API_URL}/ChangePassword`,
        data,

        {
            headers: {

                Authorization:
                    `Bearer ${localStorage.getItem("token")}`

            }
        }

    );

    return response.data;

};

const GetComplaintHistory = async (complaintId) => {

    const response = await axios.get(
        `${API_URL}/ComplaintHistory/${complaintId}`,
        GetAuthHeader()
    );

    return response.data;

};

const GetDashboard = async () => {

    const response = await axios.get(

        `${API_URL}/Dashboard`,

        GetAuthHeader()

    );

    return response.data;
};

const OfficerService = {

    GetMyComplaints,
    GetComplaintDetails,
    UploadBeforeWork,
    UploadDuringWork,
    UploadAfterWork,
    CompleteComplaint,
    GetProfile,
    GetNotifications,
    GetComplaintTimeline,
    ChangePassword,
    GetComplaintHistory,
    GetDashboard

};


export default OfficerService;