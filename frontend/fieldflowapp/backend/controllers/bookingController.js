const pool = require("../config/db");
const Booking = require("../models/Booking");
const { notify } = require("../services/notificationService");

// GET all bookings
async function getAllBookings(req, res) {
  try {
    // Dispatcher booking list
    const result = await pool.query(`
      SELECT
        b.id,
        u.name AS customer_name,
        u.phone,
        s.name AS service_name,
        b.booking_date,
        b.booking_time,
        b.address,
        b.status,
        b.created_at
      FROM bookings b
      INNER JOIN users u
        ON b.user_id = u.id
      INNER JOIN services s
        ON b.service_id = s.id
      ORDER BY b.created_at DESC;
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      bookings: result.rows,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    // Fallback to model if required
    try {
      const result = await Booking.findAll();
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch bookings",
        error: err.message,
      });
    }
  }
}

async function getBookingById(req, res) {
  try {
    const result = await Booking.findById(req.params.id);

    if (!result.rows.length) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateBookingStatus(req, res) {
  try {
    const result = await Booking.updateStatus(
      req.params.id,
      req.body.status
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function assignTechnician(req, res) {
  try {
    const result = await Booking.assignTechnician(
      req.params.id,
      req.body.technicianId
    );

    await notify(
      req.body.technicianId,
      `You have been assigned a new booking #${req.params.id}`
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  assignTechnician,
};