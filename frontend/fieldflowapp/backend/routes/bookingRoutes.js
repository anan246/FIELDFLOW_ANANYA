const express = require("express");
const pool = require("../config/db");

const router = express.Router();

/*
 * CREATE BOOKING
 */
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      service_id,
      booking_date,
      booking_time,
      address,
      status,
    } = req.body;

    if (
      !user_id ||
      !service_id ||
      !booking_date ||
      !booking_time ||
      !address
    ) {
      return res.status(400).json({
        message: "Missing required booking details",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO bookings
      (
        user_id,
        service_id,
        booking_date,
        booking_time,
        status,
        address
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        user_id,
        service_id,
        booking_date,
        booking_time,
        status || "Pending",
        address,
      ]
    );

    res.status(201).json({
      message: "Booking created successfully",
      booking: result.rows[0],
    });
  } catch (error) {
    console.error("Booking creation error:", error);

    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
});


/*
 * GET SINGLE BOOKING DETAILS
 *
 * IMPORTANT:
 * This must come BEFORE /:userId
 */
router.get("/details/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    const result = await pool.query(
      `
      SELECT
        b.*,
        s.name AS service_name,
        s.description AS service_description,
        s.price AS service_price,
        c.name AS category_name,
        u.name AS customer_name,
        u.phone AS customer_phone
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN categories c ON s.category_id = c.id
      JOIN users u ON b.user_id = u.id
      WHERE b.id = $1
      `,
      [bookingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      booking: result.rows[0],
    });
  } catch (error) {
    console.error("Get booking details error:", error);

    res.status(500).json({
      message: "Failed to fetch booking details",
      error: error.message,
    });
  }
});


/*
 * GET BOOKINGS FOR CUSTOMER
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT
        b.*,
        s.name AS service_name,
        s.price AS service_price,
        c.name AS category_name
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN categories c ON s.category_id = c.id
      WHERE b.user_id = $1
      ORDER BY b.booking_date DESC, b.booking_time DESC
      `,
      [userId]
    );

    res.json({
      bookings: result.rows,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});
// Cancel a booking
router.patch("/:bookingId/cancel", async (req, res) => {
  try {
    const { bookingId } = req.params;

    const result = await pool.query(
      `
      UPDATE bookings
      SET status = 'Cancelled'
      WHERE id = $1
      RETURNING *
      `,
      [bookingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      message: "Booking cancelled successfully",
      booking: result.rows[0],
    });
  } catch (error) {
    console.error("Cancel booking error:", error);

    res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
});

module.exports = router;