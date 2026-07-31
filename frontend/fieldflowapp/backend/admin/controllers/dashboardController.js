const pool = require("../../config/db");

async function getDashboard(req, res) {
  try {
    const [customers, technicians, bookings, pending, completed, recentBookings] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM users WHERE role='customer'"),
      pool.query("SELECT COUNT(*) FROM users WHERE role='technician'"),
      pool.query("SELECT COUNT(*) FROM bookings"),
      pool.query("SELECT COUNT(*) FROM bookings WHERE LOWER(status)='pending'"),
      pool.query("SELECT COUNT(*) FROM bookings WHERE LOWER(status)='completed'"),
      pool.query(`
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
        ORDER BY b.created_at DESC LIMIT 8`),
    ]);

    res.json({
      stats: {
        totalCustomers:   parseInt(customers.rows[0].count),
        totalTechnicians: parseInt(technicians.rows[0].count),
        totalBookings:    parseInt(bookings.rows[0].count),
        pendingBookings:  parseInt(pending.rows[0].count),
        completedBookings: parseInt(completed.rows[0].count),
      },
      recentBookings: recentBookings.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to load dashboard." });
  }
}

module.exports = { getDashboard };
