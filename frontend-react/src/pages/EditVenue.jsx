import { useEffect, useState } from "react";
import { getVenueById, updateVenue } from "../api/Venues";
import { useNavigate, useParams } from "react-router-dom";

export default function EditVenue() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    getVenueById(id).then(res => {
      setForm({
        ...res.data,
        amenities: res.data.amenities.join(",")
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await updateVenue(id, {
      ...form,
      capacity: Number(form.capacity),
      pricePerDay: Number(form.pricePerDay),
      amenities: form.amenities.split(",")
    });

    alert("Updated ✅");
    nav("/venues");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-5">

        <h2 className="text-3xl font-bold text-center text-gray-700">
          ✏ Edit Venue
        </h2>

        {[
          { label: "Venue Name", name: "name" },
          { label: "Location", name: "location" },
          { label: "Capacity", name: "capacity" },
          { label: "Amenities", name: "amenities" },
          { label: "Price Per Day", name: "pricePerDay" }
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              {field.label}
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black 
              focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition"
              name={field.name}
              value={form[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          onClick={submit}
          className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Update Venue
        </button>

      </div>
    </div>
  );
}