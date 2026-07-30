const pool = require("../config/db");

async function getDashboardStats() {
  const [totalUsers, totalTechnicians, totalBookings, pendingBookings, completedBookings, revenue] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM users WHERE role='customer'"),
    pool.query("SELECT COUNT(*) FROM users WHERE role='technician'"),
    pool.query("SELECT COUNT(*) FROM bookings"),
    pool.query("SELECT COUNT(*) FROM bookings WHERE status='pending'"),
    pool.query("SELECT COUNT(*) FROM bookings WHERE status='completed'"),
    pool.query("SELECT COALESCE(SUM(s.base_price),0) AS total FROM bookings b JOIN services s ON s.category=b.service_category WHERE b.status='completed'"),
  ]);

  return {
    totalUsers: parseInt(totalUsers.rows[0].count),
    totalTechnicians: parseInt(totalTechnicians.rows[0].count),
    totalBookings: parseInt(totalBookings.rows[0].count),
    pendingBookings: parseInt(pendingBookings.rows[0].count),
    completedBookings: parseInt(completedBookings.rows[0].count),
    totalRevenue: parseFloat(revenue.rows[0].total),
  };
}

async function getRecentBookings() {
  const result = await pool.query(`
    SELECT b.id, b.service_category, b.status, b.created_at,
      c.name AS customer_name, t.name AS technician_name
    FROM bookings b
    LEFT JOIN users c ON b.customer_id = c.id
    LEFT JOIN users t ON b.technician_id = t.id
    ORDER BY b.created_at DESC LIMIT 10`);
  return result.rows;
}

module.exports = { getDashboardStats, getRecentBookings };
