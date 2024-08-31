import { fetchInstance } from "./index.js";

export const RegisterUser = async (payload) => {
    try {
        const response = await fetchInstance('POST',"/api/user/register", payload);
        return response.json();
    } catch (err) {
        return err;
    }
};

export const LoginUser = async (payload) => {
    try {
        const response = await fetchInstance('POST','/api/user/login', payload);
        return response.json();
    } catch (err) {
        return err;
    }
}

export const GetCurrentUser = async () => {
    try {
        const response = await fetchInstance('GET','/api/user/get-current-user');
        return response.json();
    } catch (err) {
        return err;
    }
}