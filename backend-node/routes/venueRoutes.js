const express = require("express");
const router = express.Router();
const Venue = require("../models/venue");
const auth = require("../middleware/auth");

// -------------------------
// Get all venues (any logged-in user)
// -------------------------
router.get("/", auth, async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------
// Create a new venue (admin only)
// -------------------------
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, location, capacity, amenities, pricePerDay } = req.body;
    const newVenue = new Venue({ name, location, capacity, amenities, pricePerDay });
    const savedVenue = await newVenue.save();

    res.json(savedVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// -------------------------
// Get a single venue by ID (any logged-in user)
// -------------------------
router.get("/:id", auth, async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: "Venue not found" });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------
// Update a venue (admin only)
// -------------------------
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// -------------------------
// Delete a venue (admin only)
// -------------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Venue.findByIdAndDelete(req.params.id);
    res.json({ message: "Venue deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;