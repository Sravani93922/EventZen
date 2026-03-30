import axios from "axios";

const API = "http://localhost:8082/api/admin";

export const addExpense = (eventId, payload) =>
  axios.post(`${API}/expenses/${eventId}`, payload, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });

export const getSummary = (eventId) =>
  axios.get(`${API}/expenses/${eventId}/summary`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });