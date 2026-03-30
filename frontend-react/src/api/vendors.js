import axios from "axios";

const BASE_URL = "http://localhost:8082/api/admin/vendors"; // must match backend
const getToken = () => localStorage.getItem("token");

export const getVendors = async () => {
  const token = getToken();
  return axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addVendor = async (vendor) => {
  const token = getToken();
  return axios.post(BASE_URL, vendor, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteVendor = async (vendorId) => {
  const token = getToken();
  return axios.delete(`${BASE_URL}/${vendorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};