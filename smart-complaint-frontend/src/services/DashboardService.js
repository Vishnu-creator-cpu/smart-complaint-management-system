import axios from "axios";

const API_URL = "https://localhost:7124/api/citizen/dashboard";

const GetDashboard = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

const DashboardService = {
    GetDashboard
};

export default DashboardService;