import React, { useEffect, useState } from "react";
import { getVendors, addVendor, deleteVendor } from "../api/vendors";

export default function VendorsList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newVendor, setNewVendor] = useState({
    name: "",
    serviceType: "",
    email: "",
    phone: "",
    active: true
  });

  const role = (localStorage.getItem("role") || "USER").toUpperCase();
  const isAdmin = role === "ADMIN";

  const loadVendors = async () => {
    setLoading(true);
    try {
      const res = await getVendors();
      setVendors(res.data);
    } catch (err) {
      console.error("Error loading vendors:", err);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVendor = async () => {
    if (!newVendor.name || !newVendor.serviceType) {
      return alert("Vendor name and service type are required");
    }
    try {
      await addVendor(newVendor);
      setNewVendor({ name: "", serviceType: "", email: "", phone: "", active: true });
      loadVendors();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add vendor");
    }
  };

  const handleDeleteVendor = async (id) => {
    if (!window.confirm("Do you want to delete this vendor?")) return;
    try {
      await deleteVendor(id);
      loadVendors();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete vendor");
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  if (loading)
    return <p className="p-5 text-center text-lg font-semibold">Loading vendors...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Admin Add Vendor */}
      {isAdmin && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-2">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded-md"
            value={newVendor.name}
            onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Service Type"
            className="border p-2 rounded-md"
            value={newVendor.serviceType}
            onChange={(e) =>
              setNewVendor({ ...newVendor, serviceType: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md"
            value={newVendor.email}
            onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="border p-2 rounded-md"
            value={newVendor.phone}
            onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
          />
          <button
            onClick={handleAddVendor}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          >
            Add Vendor
          </button>
        </div>
      )}

      {/* Vendors Grid */}
      {vendors.length === 0 ? (
        <p className="text-center text-red-500">No vendors available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((v) => (
            <div
              key={v.id || v._id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-slate-800">{v.name}</h2>
                <p className="text-sm text-slate-500 mb-1">Servicetype:{v.serviceType}</p>
                <p className="text-sm text-slate-500 mb-1">📧Email: {v.email}</p>
                <p className="text-sm text-slate-500 mb-1">📞Phone: {v.phone}</p>
                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                    v.active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                  }`}
                >
                  {v.active ? "Active" : "Inactive"}
                </span>
              </div>

              {isAdmin && (
                <button
                  onClick={() => handleDeleteVendor(v.id || v._id)}
                  className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mt-auto"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}