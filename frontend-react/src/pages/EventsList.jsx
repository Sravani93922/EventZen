import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent, bookEvent } from "../api/events";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role?.toUpperCase() === "ADMIN";

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      alert("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-5">
      {/* Add Event Button (Top Right) */}
      {isAdmin && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/admin/events/add")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            + Add Event
          </button>
        </div>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id || event.id} event={event} refresh={fetchEvents} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No events available</p>
        )}
      </div>
    </div>
  );
}