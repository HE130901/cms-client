import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7148/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
