export default function VenueCard({
  v,
  onDelete,
  onEdit,
  onBook,
  onCancel,
  booking
}) {
  const isBooked = !!booking;

  const role = localStorage.getItem("role");
  const isAdmin = role?.toUpperCase() === "ADMIN";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border border-gray-100 flex flex-col justify-between">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {v.name}
          </h2>
          <p className="text-sm text-slate-500">
            📍 {v.location}
          </p>
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            isBooked
              ? "bg-red-50 text-red-500"
              : "bg-green-50 text-green-600"
          }`}
        >
          {isBooked ? "Booked" : "Available"}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-3 text-sm">

        <div className="bg-indigo-50 p-2 rounded-md">
          <p className="text-xs text-slate-500">Capacity</p>
          <p className="font-medium text-slate-700">👥 {v.capacity}</p>
        </div>

        <div className="bg-indigo-50 p-2 rounded-md">
          <p className="text-xs text-slate-500">Price</p>
          <p className="font-medium text-slate-700">₹{v.pricePerDay}</p>
        </div>

      </div>

      {/* AMENITIES */}
      <div className="mt-3">
        <p className="text-xs text-slate-500 mb-1">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {v.amenities?.map((a, i) => (
            <span
              key={i}
              className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-4 space-y-2">

        {/* ✅ SHOW ONLY FOR ADMIN */}
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(v)}
              className="flex-1 bg-yellow-400 text-white py-1 rounded-md hover:bg-yellow-500 transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(v._id)}
              className="flex-1 bg-red-500 text-white py-1 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}

        {/* BOOK / CANCEL (FOR ALL USERS) */}
        {!isBooked ? (
          <button
            onClick={() => onBook(v)}
            className="w-full bg-indigo-600 text-white py-1 rounded-md hover:bg-indigo-700 transition"
          >
            Book Now
          </button>
        ) : (
          <button
            onClick={() => onCancel(booking._id)}
            className="w-full bg-gray-400 text-white py-1 rounded-md hover:bg-gray-500 transition"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}