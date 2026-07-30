const pool = require("../config/db");

async function getBookingReport(from, to) {
  const result = await pool.query(`
    SELECT b.service_category, b.status, COUNT(*) as count
    FROM bookings b
    WHERE b.created_at BETWEEN $1 AND $2
    GROUP BY b.service_category, b.status
    ORDER BY b.service_category`, [from, to]);
  return result.rows;
}

async function getTechnicianReport() {
  const result = await pool.query(`
    SELECT u.name, u.category, COUNT(b.id) as total_jobs,
      SUM(CASE WHEN b.status='completed' THEN 1 ELSE 0 END) as completed
    FROM users u
    LEFT JOIN bookings b ON b.technician_id = u.id
    WHERE u.role='technician'
    GROUP BY u.id, u.name, u.category
    ORDER BY total_jobs DESC`);
  return result.rows;
}

module.exports = { getBookingReport, getTechnicianReport };
