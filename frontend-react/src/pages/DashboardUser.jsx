// src/pages/DashboardUser.jsx
import { FaCalendarAlt, FaMapMarkedAlt, FaStar } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";


export default function DashboardUser() {
  const username = localStorage.getItem("username") || "User";

  const stats = [
    {
      title: "Upcoming Events",
      value: 5, // you can fetch from API
      icon: <FaCalendarAlt className="text-4xl text-indigo-500" />,
      link: "/events",
    },
    {
      title: "Favorite Venues",
      value: 3, // example data
      icon: <FaMapMarkedAlt className="text-4xl text-green-500" />,
      link: "/venues",
    },
    {
      title: "Points / Rewards",
      value: 1200,
      icon: <FaStar className="text-4xl text-yellow-500" />,
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center w-full max-w-2xl mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-indigo-700 mb-4">
          Welcome, {username}!
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Discover events, explore venues, and enjoy your personalized dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            to={stat.link}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer"
          >
            <div className="mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-500">{stat.title}</p>
          </Link>
        ))}
      </div>

      {/* Optional Fun Section */}
      <div className="mt-16 text-center">
        <p className="text-gray-500 italic">
          🌟 Pro Tip: Click on cards to explore events and venues. Your next experience awaits!
        </p>
      </div>
    </div>
  );
}