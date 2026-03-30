const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const userRoutes = require("./routes/userRoutes");
const venueRoutes = require("./routes/venueRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/bookings", bookingRoutes);


// MongoDB connection
const mongoURL =
  process.env.MONGO_URL || "mongodb://localhost:27017/eventzen-node";

mongoose
  .connect(mongoURL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => res.send("Server is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);