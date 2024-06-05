import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7148/api", // URL backend
  timeout: 10000, // Thời gian timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
