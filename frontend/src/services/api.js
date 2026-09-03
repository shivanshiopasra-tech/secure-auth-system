import axios from "axios";

const API = axios.create({
  baseURL:  "https://secure-auth-system-84xx.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    console.log("Token being sent:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;