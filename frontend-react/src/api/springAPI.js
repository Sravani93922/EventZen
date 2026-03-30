// springAPI.js
import axios from "axios";

const springAPI = axios.create({
  baseURL: "http://localhost:8082/api", // Spring backend port
});

// Attach JWT token automatically
springAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default springAPI;