import axios from "axios";

const API_NODE = "http://localhost:5000/api/users";

export const saveToken = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const login = async (email, password) => {
  const res = await axios.post(`${API_NODE}/login`, { email, password });

  const token = res.data.token;

  // Fetch profile using token
  const profile = await axios.get(`${API_NODE}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const role = profile.data.user.role;

  // Save to localStorage
  saveToken(token, role);

  return { token, role }; // ✅ IMPORTANT CHANGE
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_NODE}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};