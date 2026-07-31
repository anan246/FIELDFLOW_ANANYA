const pool = require("../../config/db");

async function getAllBookings(req, res) {
  try {
    const result = await pool.query(`
      SELECT b.id, b.service_category, b.status, b.address, b.city, b.created_at,
        c.name AS customer_name, c.phone AS customer_phone,
        t.name AS technician_name
      FROM bookings b
      LEFT JOIN users c ON b.customer_id = c.id
      LEFT JOIN users t ON b.technician_id = t.id
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
