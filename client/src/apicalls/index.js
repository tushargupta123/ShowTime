import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "",
    headers: {
        withCredentials: true,
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});