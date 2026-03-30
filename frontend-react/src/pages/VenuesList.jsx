import { useEffect, useState } from "react";
import { getVenues, deleteVenue, bookVenue } from "../api/Venues";
import API from "../api/api";
import VenueCard from "../components/VenueCard";
import { useNavigate } from "react-router-dom";

export default function VenuesList() {
  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState([]);
  const nav = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role?.toUpperCase() === "ADMIN";

  useEffect(() => {
    loadData();
    loadBookings();
  }, []);

  const loadData = async () => {
    const res = await getVenues();
    setData(res.data);
  };

  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Booking fetch error:", err);
    }
  };

  const remove = async (id) => {
    await deleteVenue(id);
    setData(data.filter(v => v._id !== id));
  };

  const handleEdit = (venue) => {
    nav(`/admin/venues/edit/${venue._id}`);
  };

  const handleBook = async (venue) => {
    await bookVenue({
      venueId: venue._id,
      date: new Date().toISOString()
    });

    alert("Booked ✅");
    loadBookings();
  };

  const handleCancel = async (bookingId) => {
    await API.delete(`/bookings/${bookingId}`);
    alert("Cancelled ❌");
    loadBookings();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center px-6 pt-6 pb-2">
        <h1 className="text-3xl font-bold text-gray-700">
          🎉 Venues
        </h1>

        {isAdmin && (
          <button
            onClick={() => nav("/admin/venues/add")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            ➕ Add Venue
          </button>
        )}
      </div>

      {/* 🔥 VENUES GRID */}
      <div className="px-6 pb-8">
        {data.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            <h2 className="text-xl font-semibold">
              No venues available 😕
            </h2>
            <p className="text-sm mt-2">
              Add a venue to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.map(v => {
              const booking = bookings.find(
                b => b?.venue?._id === v?._id
              );

              return (
                <VenueCard
                  key={v._id}
                  v={v}
                  onDelete={remove}
                  onEdit={handleEdit}
                  onBook={handleBook}
                  onCancel={handleCancel}
                  booking={booking}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}