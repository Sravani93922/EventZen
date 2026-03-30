import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import VenuesList from "./pages/VenuesList";
import AddVenue from "./pages/AddVenue";
import EditVenue from "./pages/EditVenue";
import BookEvent from "./pages/BookEvent";

import EventsList from "./pages/EventsList";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import EventDetails from "./pages/EventDetails";

import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/DashboardAdmin";

import VendorsList from "./pages/VendorsList";
import AddVendor from "./pages/AddVendor";
import EditVendor from "./pages/EditVendor";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/venues"
          element={
            <ProtectedRoute>
              <VenuesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-event/:id"
          element={
            <ProtectedRoute>
              <BookEvent />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        />

        {/* VENUES */}
        <Route
          path="/admin/venues/add"
          element={
            <AdminRoute>
              <AddVenue />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/venues/edit/:id"
          element={
            <AdminRoute>
              <EditVenue />
            </AdminRoute>
          }
        />

        {/* EVENTS */}
        <Route
          path="/admin/events/add"
          element={
            <AdminRoute>
              <AddEvent />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events/edit/:id"
          element={
            <AdminRoute>
              <EditEvent />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events/details/:id"
          element={
            <AdminRoute>
              <EventDetails />
            </AdminRoute>
          }
        />

        {/* VENDORS */}
        <Route
          path="/admin/vendors"
          element={
            <AdminRoute>
              <VendorsList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/vendors/add"
          element={
            <AdminRoute>
              <AddVendor />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/vendors/edit/:id"
          element={
            <AdminRoute>
              <EditVendor />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}