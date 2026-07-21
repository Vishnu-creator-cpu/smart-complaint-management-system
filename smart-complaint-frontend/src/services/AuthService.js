import AxiosInstance from "./AxiosInstance";

const Login = async (loginData) => {
    const response = await AxiosInstance.post("/Auth/Login", loginData);

    if (response.data.success) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

const Logout = () => {
    localStorage.removeItem("token");
};

const GetToken = () => {
    return localStorage.getItem("token");
};

const IsAuthenticated = () => {
    return !!localStorage.getItem("token");
};

const AuthService = {
    Login,
    Logout,
    GetToken,
    IsAuthenticated
};

export default AuthService;