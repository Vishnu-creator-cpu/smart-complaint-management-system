import axios from "axios";

const API_URL = "https://localhost:7124/api/Auth";

const Register = async (userData) => {

    try {

        const response = await axios.post(
            `${API_URL}/Register`,
            userData
        );

        return {
            success: true,
            message: response.data
        };

    }
    catch (error) {

        return {
            success: false,
            message: error.response?.data || "Registration Failed"
        };

    }

};

export default {
    Register
};