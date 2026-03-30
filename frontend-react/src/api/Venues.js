import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// ✅ common config
const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ VENUES
export const getVenues = () =>
  axios.get(`${BASE_URL}/venues`, getConfig());

export const getVenueById = (id) =>
  axios.get(`${BASE_URL}/venues/${id}`, getConfig());

export const addVenue = (data) =>
  axios.post(`${BASE_URL}/venues`, data, getConfig());

export const updateVenue = (id, data) =>
  axios.put(`${BASE_URL}/venues/${id}`, data, getConfig());

export const deleteVenue = (id) =>
  axios.delete(`${BASE_URL}/venues/${id}`, getConfig());

// ✅ BOOKINGS
export const bookVenue = (data) =>
  axios.post(`${BASE_URL}/bookings`, data, getConfig());