import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardAdmin() {
  const [d, setD] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8082/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setD(res.data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="card p-4">Total Events: {d.totalEvents}</div>
      <div className="card p-4">Upcoming: {d.upcomingEvents}</div>
      <div className="card p-4">Vendors: {d.totalVendors}</div>
    </div>
  );
}