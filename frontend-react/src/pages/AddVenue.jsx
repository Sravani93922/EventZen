import { useState } from "react";
import { addVenue } from "../api/Venues";
import { useNavigate } from "react-router-dom";

export default function AddVenue() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: "",
    amenities: "",
    pricePerDay: ""
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await addVenue({
      ...form,
      capacity: Number(form.capacity),
      pricePerDay: Number(form.pricePerDay),
      amenities: form.amenities.split(",")
    });

    alert("Venue Added ✅");
    nav("/venues");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-5">

        <h2 className="text-3xl font-bold text-center text-gray-700">
          ➕ Add Venue
        </h2>

        {/* COMMON INPUT STYLE */}
        {[
          { label: "Venue Name", name: "name", placeholder: "Enter venue name" },
          { label: "Location", name: "location", placeholder: "Enter location" },
          { label: "Capacity", name: "capacity", placeholder: "Enter capacity" },
          { label: "Amenities", name: "amenities", placeholder: "AC, Parking, Wifi" },
          { label: "Price Per Day", name: "pricePerDay", placeholder: "Enter price" }
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              {field.label}
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Venue
        </button>

      </div>
    </div>
  );
}