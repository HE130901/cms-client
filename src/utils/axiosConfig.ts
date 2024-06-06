// src/utils/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7148", // URL của backend API
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle errors globally here if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
