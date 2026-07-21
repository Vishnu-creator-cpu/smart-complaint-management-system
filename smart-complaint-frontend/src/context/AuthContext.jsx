import { createContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const token = AuthService.GetToken();

        setIsAuthenticated(!!token);

    }, []);

    const Login = async (loginData) => {

        const response = await AuthService.Login(loginData);

        if (response.success) {
            setIsAuthenticated(true);
        }

        return response;
    };

    const Logout = () => {

        AuthService.Logout();

        setIsAuthenticated(false);

    };

    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                Login,
                Logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;