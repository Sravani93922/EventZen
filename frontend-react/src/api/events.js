import axios from "axios";

const SPRING_API = axios.create({
  baseURL: "http://localhost:8082/api", // Spring backend for events
});

const NODE_API = axios.create({
  baseURL: "http://localhost:5000/api", // Node backend for bookings
});

const getToken = () => localStorage.getItem("token");

// -------------------- EVENTS ENDPOINTS --------------------
export const getEvents = async () => {
  const token = getToken();
  return SPRING_API.get("/events", { headers: { Authorization: `Bearer ${token}` } });
};

export const getEventById = async (id) => {
  const token = getToken();
  return SPRING_API.get(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const addEvent = async (event) => {
  const token = getToken();
  return SPRING_API.post("/admin/events", event, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateEvent = async (id, event) => {
  const token = getToken();
  return SPRING_API.put(`/admin/events/${id}`, event, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteEvent = async (id) => {
  const token = getToken();
  return SPRING_API.delete(`/admin/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};

// -------------------- EXPENSES --------------------
export const getEventExpenses = async (eventId) => {
  const token = getToken();
  return SPRING_API.get(`/admin/expenses/${eventId}/summary`, { headers: { Authorization: `Bearer ${token}` } });
};

// -------------------- BOOKINGS (optional, keep for BookEvent page) --------------------
export const bookEvent = async ({ eventId, bookingDate }) => {
  const token = getToken();
  if (!eventId || !bookingDate) throw new Error("eventId and bookingDate required");
  return NODE_API.post(
    "/bookings",
    { venueId: eventId, date: bookingDate },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const cancelBooking = async (bookingId) => {
  const token = getToken();
  return NODE_API.delete(`/bookings/${bookingId}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const getBookings = async () => {
  const token = getToken();
  return NODE_API.get("/bookings", { headers: { Authorization: `Bearer ${token}` } });
};