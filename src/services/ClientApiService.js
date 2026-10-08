import axios from "axios";

export const HTTPClient = axios.create({
    baseURL: "http://localhost:5026",
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    }
});

HTTPClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

HTTPClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default HTTPClient;