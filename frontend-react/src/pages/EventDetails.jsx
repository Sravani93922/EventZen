import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent, bookEvent } from "../api/events";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role") || "USER");
  const [loading, setLoading] = useState(true);

  // Load single event
  const loadEvent = async () => {
    try {
      const res = await getEventById(id);
      setEvent(res.data);
    } catch (err) {
      console.error("Event load error:", err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  // Booking handler
  const handleBook = async () => {
    try {
      await bookEvent({ eventId: event._id, date: new Date().toISOString() });
      alert("Booking successful!");
      loadEvent(); // refresh
    } catch (err) {
      alert(`Booking failed: ${err?.response?.data?.message || err.message}`);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!window.confirm("Do you really want to delete this event?")) return;
    try {
      await deleteEvent(event._id);
      alert("Event deleted successfully");
      navigate("/events"); // back to events list
    } catch (err) {
      alert(`Delete failed: ${err?.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <p className="p-5 text-center">Loading event...</p>;
  if (!event) return <p className="p-5 text-center text-red-500">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md mt-5 rounded">
      <h1 className="text-2xl font-bold mb-3">{event.title}</h1>
      <p className="mb-2">{event.description}</p>
      <p className="text-gray-600 mb-2">
        {event.eventDate} | {event.eventTime} | Capacity: {event.capacity} | Status: {event.status}
      </p>

      {role === "ADMIN" && event.expenses && (
        <div className="mb-3 p-3 border rounded bg-gray-50">
          <p className="font-semibold mb-1">Expenses:</p>
          <p>Total Spent: {event.expenses.totalSpent}</p>
          <p>Remaining Budget: {event.expenses.remainingBudget}</p>
          <p>Event Budget: {event.expenses.eventBudget}</p>
        </div>
      )}

      <div className="flex justify-center gap-3 mt-4">
        {role === "USER" && (
          <button className="btn btn-primary" onClick={handleBook}>
            Book
          </button>
        )}
        {role === "ADMIN" && (
          <>
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/events/edit/${event._id}`)}
            >
              Edit
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-info" disabled>
              Expenses
            </button>
            <button className="btn btn-primary" onClick={handleBook}>
              Book
            </button>
          </>
        )}
      </div>
    </div>
  );
}