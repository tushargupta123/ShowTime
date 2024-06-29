import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://show-time-murex.vercel.app",
    headers: {
        withCredentials: true,
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});