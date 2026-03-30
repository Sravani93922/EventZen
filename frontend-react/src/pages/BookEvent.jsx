import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById, bookEvent } from "../api/events";
import Modal from "../components/Modal";

export default function BookEvent() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role?.toUpperCase() === "ADMIN";

  const [event, setEvent] = useState(null);
  const [isFull, setIsFull] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    date: "",
    reason: "",
  });

  // Load event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id, token);
        setEvent(res.data);

        // Check capacity
        if (res.data.capacity <= res.data.attendees) {
          setIsFull(true);
        }
      } catch (err) {
        console.error("Load event failed:", err);
        setErrorMsg("Failed to load event");
      }
    };
    fetchEvent();
  }, [id, token]);

  // Submit booking
  const submitBooking = async () => {
    if (!form.date || !form.reason) {
      alert("Please fill all fields");
      return;
    }

    try {
      await bookEvent(id, token); // Payload matches Node backend
      setSuccess(true);
      setIsFull(true); // block double booking if capacity is full
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message;
      alert("Booking failed: " + msg);
    }
  };

  if (errorMsg) {
    return (
      <div className="p-6 text-center text-red-600 font-bold">{errorMsg}</div>
    );
  }

  if (!event) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Loading event details...
      </div>
    );
  }

  if (isFull) {
    return (
      <div className="p-6 text-center text-xl font-bold text-red-600">
        ❌ This event is full. No more bookings allowed.
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="card bg-base-200 p-6 w-full md:w-[500px] shadow">
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        <p className="mb-2">{event.description}</p>
        <p className="mb-2">
          <span className="font-semibold">Venue:</span> {event.venue}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Date:</span> {event.eventDate} |{" "}
          <span className="font-semibold">Time:</span> {event.eventTime}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Capacity:</span> {event.capacity} |{" "}
          <span className="font-semibold">Attendees:</span> {event.attendees}
        </p>

        {/* Booking Form */}
        <label className="font-semibold">Select Date</label>
        <input
          type="date"
          className="input w-full mb-3"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <label className="font-semibold">Reason for Booking</label>
        <textarea
          className="textarea w-full mb-3"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />

        <button
          className="btn btn-primary w-full mt-2"
          onClick={submitBooking}
        >
          Confirm Booking
        </button>
      </div>

      {/* Success Modal */}
      <Modal open={success} onClose={() => setSuccess(false)}>
        <h2 className="text-xl font-bold text-center">Booking Successful 🎉</h2>
        <p className="text-center mt-2">
          Your event booking has been confirmed.
        </p>
      </Modal>
    </div>
  );
}