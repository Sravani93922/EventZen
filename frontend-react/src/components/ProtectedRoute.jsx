import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAdmin = role?.toUpperCase() === "ADMIN";

  if (!token) {
    return <Navigate to="/login" />;
  }

  // 🔥 allow both user & admin
  return children;
}