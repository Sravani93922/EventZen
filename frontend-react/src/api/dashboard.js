import axios from "axios";

export const getDashboard = () =>
  axios.get("http://localhost:8082/api/admin/dashboard", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });