import { useState } from "react";
import { addEvent } from "../api/events";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    venue: "",
    capacity: "",
    preEventBudget: ""
  });

  const nav = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await addEvent({
        ...form,
        capacity: Number(form.capacity),
        preEventBudget: Number(form.preEventBudget)
      });
      alert("Event Added ✅");
      nav("/events");
    } catch (err) {
      alert("Add failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-200 shadow-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">➕ Add Event</h2>

        {["title","description","eventDate","eventTime","venue","capacity","preEventBudget"].map((field) => (
          <div key={field}>
            <label className="font-semibold">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="input input-bordered w-full"
              type={field.includes("Date") ? "date" : field.includes("Time") ? "time" : "text"}
            />
          </div>
        ))}

        <button onClick={submit} className="btn btn-primary w-full">Add Event</button>
      </div>
    </div>
  );
}