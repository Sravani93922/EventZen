import React, { useState } from "react";
import { deleteEvent, bookEvent } from "../api/events";

export default function EventCard({ event, refresh }) {
  const role = localStorage.getItem("role");
  const isAdmin = role?.toUpperCase() === "ADMIN";

  const isBooked = !!event.isBooked; // optional: if you track booking status
  const [expenses, setExpenses] = useState(null);

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this event?")) {
      try {
        await deleteEvent(event._id || event.id);
        refresh();
      } catch (err) {
        console.error("Delete failed:", err);
        alert(`Delete failed: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleBook = async () => {
    try {
      await bookEvent({ eventId: event._id || event.id, bookingDate: new Date() });
      alert("Booking successful!");
      refresh();
    } catch (err) {
      console.error(err);
      alert(`Booking failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleViewExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8082/api/admin/expenses/${event._id || event.id}/summary`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setExpenses(data);

      alert(
        `Event Budget: ${data.eventBudget || 0}\n` +
        `Total Spent: ${data.totalSpent || 0}\n` +
        `Remaining Budget: ${data.remainingBudget || 0}`
      );
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      alert("Failed to load expenses.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border border-gray-100 flex flex-col justify-between">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{event.title}</h2>
          <p className="text-sm text-slate-500">📍 {event.venue}</p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 gap-3 text-sm">
        <div className="bg-indigo-50 p-2 rounded-md">
          <p className="text-xs text-slate-500">Date</p>
          <p className="font-medium text-slate-700">{event.eventDate}</p>
        </div>

        <div className="bg-indigo-50 p-2 rounded-md">
          <p className="text-xs text-slate-500">Time</p>
          <p className="font-medium text-slate-700">{event.eventTime}</p>
        </div>

        <div className="bg-indigo-50 p-2 rounded-md">
          <p className="text-xs text-slate-500">Capacity</p>
          <p className="font-medium text-slate-700">👥 {event.capacity}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-4 space-y-2">
        {isAdmin && (
          <div className="flex gap-2">
            <button className="flex-1 bg-yellow-400 text-white py-1 rounded-md hover:bg-yellow-500 transition">
              Edit
            </button>
            <button
              className="flex-1 bg-red-500 text-white py-1 rounded-md hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}

        {!isBooked ? (
          <button
            onClick={handleBook}
            className="w-full bg-indigo-600 text-white py-1 rounded-md hover:bg-indigo-700 transition"
          >
            Book Now
          </button>
        ) : (
          <button
            className="w-full bg-gray-400 text-white py-1 rounded-md hover:bg-gray-500 transition"
          >
            Cancel Booking
          </button>
        )}

        {isAdmin && (
          <button
            className="w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition"
            onClick={handleViewExpenses}
          >
            View Expenses
          </button>
        )}
      </div>
    </div>
  );
}