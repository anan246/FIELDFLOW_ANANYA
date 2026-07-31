const express = require("express");
const router = express.Router();

const {
  getAllBookings,
} = require("../controllers/bookingController");

// GET all bookings
router.get("/", getAllBookings);

module.exports = router;