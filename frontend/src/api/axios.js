import axios from "axios";

let rawBaseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
if (rawBaseURL && !rawBaseURL.endsWith("/api") && !rawBaseURL.endsWith("/api/")) {
    rawBaseURL = rawBaseURL.replace(/\/+$/, "") + "/api";
}

const API = axios.create({
    baseURL: rawBaseURL,
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;