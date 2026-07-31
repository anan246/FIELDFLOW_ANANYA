const pool = require("../../config/db");

async function getAllTechnicians(req, res) {
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, category, experience, working_area, available_today, created_at FROM users WHERE role='technician' ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function toggleAvailability(req, res) {
  try {
    const result = await pool.query(
      "UPDATE users SET available_today=$1 WHERE id=$2 AND role='technician' RETURNING id, name, available_today",
      [req.body.available, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllTechnicians, toggleAvailability };
