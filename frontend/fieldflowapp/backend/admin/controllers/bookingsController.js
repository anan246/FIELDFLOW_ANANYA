const pool = require("../../config/db");

async function getAllBookings(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        b.id,
        b.status,
        b.address,
        b.booking_date,
        b.booking_time,
        b.created_at,
        s.name AS service_category,
        c.name AS customer_name,
        c.phone AS customer_phone,
        COALESCE(c.city, c.address, b.address) AS city,
        t.name AS technician_name
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
      ORDER BY b.created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateStatus(req, res) {
  try {
    const result = await pool.query(
      "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
      [req.body.status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function assignTechnician(req, res) {
  try {
    const result = await pool.query(
      "UPDATE bookings SET technician_id=$1, status='assigned' WHERE id=$2 RETURNING *",
      [req.body.technicianId, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllBookings, updateStatus, assignTechnician };
