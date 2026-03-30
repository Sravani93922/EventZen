import { useEffect, useState } from "react";
import { getEventById, updateEvent } from "../api/events";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    getEventById(id).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await updateEvent(id, {
        ...form,
        capacity: Number(form.capacity),
        preEventBudget: Number(form.preEventBudget)
      });
      alert("Updated ✅");
      nav("/events");
    } catch (err) {
      alert("Update failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-200 shadow-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">✏ Edit Event</h2>

        {["title","description","eventDate","eventTime","venue","capacity","preEventBudget"].map((field) => (
          <div key={field}>
            <label className="font-semibold">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              type={field.includes("Date") ? "date" : field.includes("Time") ? "time" : "text"}
            />
          </div>
        ))}

        <button onClick={submit} className="btn btn-warning w-full">Update Event</button>
      </div>
    </div>
  );
}