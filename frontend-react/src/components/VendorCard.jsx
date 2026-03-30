import React from "react";

export default function VendorCard({ vendor, isAdmin, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 flex flex-col justify-between">
      <h2 className="text-lg font-semibold text-slate-800">{vendor.name}</h2>
      <p className="text-sm text-slate-500 mb-3">{vendor.description}</p>
      {isAdmin && (
        <button
          onClick={() => onDelete(vendor.id || vendor._id)}
          className="w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      )}
    </div>
  );
}