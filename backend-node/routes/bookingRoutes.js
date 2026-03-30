const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// -------------------------
// Create booking
// -------------------------
router.post("/", auth, async (req, res) => {
  try {
    const { venueId, date } = req.body;

    if (!venueId || !date) {
      return res.status(400).json({ message: "Venue ID and date are required" });
    }

    const userId = req.user.id || req.user._id;
    if (!userId) return res.status(400).json({ message: "User not found in token" });

    const newBooking = new Booking({
      user: userId,
      venue: venueId,
      date,
      status: "pending"
    });

    await newBooking.save();

    // Populate both venue and user
    await newBooking.populate("venue", "name");
    await newBooking.populate("user", "name email");

    res.json({
      message: "Booking created successfully",
      booking: newBooking
    });

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// -------------------------
// Get bookings for logged-in user
// -------------------------
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const bookings = await Booking.find({ user: userId })
      .populate("venue", "name")
      .populate("user", "name email"); // populate user to prevent object rendering error

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// -------------------------
// Cancel booking
// -------------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: userId
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await Booking.deleteOne({ _id: booking._id });
    res.json({ message: "Booking cancelled successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;