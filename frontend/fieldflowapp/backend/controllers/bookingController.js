const pool = require("../config/db");

// GET all bookings
const getAllBookings = async (req, res) => {
  try {
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

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBookings,
};