import axios from "axios";

export const BASE_URL = "https://dev.usderp.uz/preschool";

export const $api = axios.create({
    baseURL: `${BASE_URL}/api/`,
    headers: {
        "Content-Type": "application/json",
    },
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.clear();
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);
