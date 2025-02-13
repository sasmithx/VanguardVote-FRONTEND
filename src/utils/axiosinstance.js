import axios from "axios";
import {BASE_URL} from "./apiPath.js";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // Token expired or unauthorized
                console.error("Unauthorized! Redirecting to login ...");
                // Redirect to login page
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server Error! Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request Timeout!");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;