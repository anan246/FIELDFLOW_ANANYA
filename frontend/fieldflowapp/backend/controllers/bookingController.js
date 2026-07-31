const Booking = require("../models/Booking");
const { notify } = require("../services/notificationService");

async function getAllBookings(req, res) {
  try {
    const result = await Booking.findAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBookingById(req, res) {
  try {
    const result = await Booking.findById(req.params.id);
    if (!result.rows.length) return res.status(404).json({ error: "Booking not found." });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateBookingStatus(req, res) {
  try {
    const result = await Booking.updateStatus(req.params.id, req.body.status);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function assignTechnician(req, res) {
  try {
    const result = await Booking.assignTechnician(req.params.id, req.body.technicianId);
    await notify(req.body.technicianId, `You have been assigned a new booking #${req.params.id}`);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllBookings, getBookingById, updateBookingStatus, assignTechnician };
