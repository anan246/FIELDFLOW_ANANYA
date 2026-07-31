const pool = require("../config/db");

async function getDashboardStats() {
  const [totalUsers, totalTechnicians, totalBookings, pendingBookings, completedBookings, revenue] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM users"),
    pool.query("SELECT COUNT(*) FROM users WHERE LOWER(role)='technician'"),
    pool.query("SELECT COUNT(*) FROM bookings"),
    pool.query("SELECT COUNT(*) FROM bookings WHERE LOWER(status)='pending'"),
    pool.query("SELECT COUNT(*) FROM bookings WHERE LOWER(status)='completed'"),
    pool.query("SELECT COALESCE(SUM(s.base_price),0) AS total FROM bookings b JOIN services s ON s.id=b.service_id WHERE LOWER(b.status)='completed'").catch(() => ({ rows: [{ total: 0 }] })),
  ]);

  return {
    totalUsers: parseInt(totalUsers.rows[0].count) || 0,
    totalTechnicians: parseInt(totalTechnicians.rows[0].count) || 0,
    totalBookings: parseInt(totalBookings.rows[0].count) || 0,
    pendingBookings: parseInt(pendingBookings.rows[0].count) || 0,
    completedBookings: parseInt(completedBookings.rows[0].count) || 0,
    totalRevenue: parseFloat(revenue.rows[0].total) || 0,
  };
}

async function getRecentBookings() {
  const result = await pool.query(`
    SELECT b.id, s.name AS service_category, b.status, b.created_at,
      c.name AS customer_name, t.name AS technician_name
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
    ORDER BY b.created_at DESC LIMIT 10`);
  return result.rows;
}

module.exports = { getDashboardStats, getRecentBookings };
