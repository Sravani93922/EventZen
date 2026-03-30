/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function Navbar() {
  const nav = useNavigate();
  const role = localStorage.getItem("role"); // admin or user
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="navbar bg-base-300 px-6 shadow">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">EventZen</Link>
      </div>

      <div className="flex gap-4">
        {!token && (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-ghost">Register</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>

            <Link to="/venues" className="btn btn-ghost">Venues</Link>

            <Link to="/events" className="btn btn-ghost">Events</Link>

            {role === "admin" && (
              <>
                <Link to="/admin/vendors" className="btn btn-ghost">Vendors</Link>
                
              </>
            )}

            <button className="btn btn-error btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}