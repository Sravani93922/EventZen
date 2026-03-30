// src/api/nodeAPI.js
import axios from "axios";

const nodeAPI = axios.create({
  baseURL: "http://localhost:5000/api", // Node.js backend
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export default nodeAPI;