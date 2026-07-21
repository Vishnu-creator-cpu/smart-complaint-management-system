export const DecodeToken = (token) => {

    try {

        if (!token) {
            return null;
        }

        const tokenParts = token.split(".");

        if (tokenParts.length !== 3) {
            return null;
        }

        const base64Url = tokenParts[1];

        const base64 = base64Url
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((character) => {

                    return "%" +
                        ("00" +
                            character
                                .charCodeAt(0)
                                .toString(16))
                            .slice(-2);

                })
                .join("")
        );

        return JSON.parse(jsonPayload);

    }
    catch (error) {

        console.error("JWT Decode Error:", error);

        return null;

    }

};


export const GetUserName = () => {

    const token = localStorage.getItem("token");

    const decodedToken = DecodeToken(token);

    if (!decodedToken) {
        return "Citizen";
    }

    return (
        decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ] ||
        decodedToken.unique_name ||
        decodedToken.name ||
        "Citizen"
    );

};


export const GetUserRole = () => {

    const token = localStorage.getItem("token");

    const decodedToken = DecodeToken(token);

    if (!decodedToken) {
        return null;
    }

    return (
        decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] ||
        decodedToken.role ||
        null
    );

};


export const Logout = () => {

    localStorage.removeItem("token");

};