import axios from "axios";

const API_URL = "https://localhost:7124/api/Auth";

const Login = async (loginData) => {

    try {

        const response = await axios.post(
            `${API_URL}/Login`,
            loginData
        );

        return {

            success: true,

            token: response.data.token,

            role: response.data.role,

            user: response.data.user,

            message: "Login Successful"

        };

    }
    catch (error) {

        console.log(error.response);

        return {
            success: false,
            message:
                error.response?.data ||
                "Invalid Email or Password"
        };

    }

};

export default {

    Login

};