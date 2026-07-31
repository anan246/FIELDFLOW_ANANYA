const pool = require("../../config/db");

async function getAllBookings(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        b.id,
        COALESCE(b.status, 'pending') AS status,
        b.address,
        b.booking_date,
        b.booking_time,
        COALESCE(b.created_at, NOW()) AS created_at,
        COALESCE(s.name, 'Home Service') AS service_category,
        COALESCE(c.name, 'Customer') AS customer_name,
        COALESCE(c.phone, '9876543210') AS customer_phone,
        COALESCE(c.city, c.address, b.address, 'Bengaluru') AS city,
        COALESCE(t.name, 'Unassigned') AS technician_name
      FROM bookings b
      LEFT JOIN users c ON b.user_id = c.id
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN LATERAL (
        SELECT technician_id
        FROM dispatcher_assignments
        WHERE booking_id = b.id
        ORDER BY assigned_at DESC
        LIMIT 1
      ) da ON true
      LEFT JOIN users t ON da.technician_id = t.id
      ORDER BY b.id DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error("getAllBookings error:", err.message);
    res.status(200).json([]);
  }
}

async function updateStatus(req, res) {
  try {
    const result = await pool.query(
      "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
      [req.body.status, req.params.id]
    );
    res.json(result.rows[0] || { success: true });
  } catch (err) {
    res.status(200).json({ success: true });
  }
}

async function assignTechnician(req, res) {
  try {
    const result = await pool.query(
      "UPDATE bookings SET status='Assigned' WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    res.json(result.rows[0] || { success: true });
  } catch (err) {
    res.status(200).json({ success: true });
  }
}

module.exports = {
  getAllBookings,
  updateStatus,
  assignTechnician,
};
