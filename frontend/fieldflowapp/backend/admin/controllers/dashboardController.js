const pool = require("../../config/db");

async function getDashboard(req, res) {
  try {
    const customers = await pool.query("SELECT COUNT(*) FROM users WHERE LOWER(role)='customer'").catch(() => ({ rows: [{ count: 0 }] }));
    const technicians = await pool.query("SELECT COUNT(*) FROM users WHERE LOWER(role)='technician'").catch(() => ({ rows: [{ count: 0 }] }));
    const bookings = await pool.query("SELECT COUNT(*) FROM bookings").catch(() => ({ rows: [{ count: 0 }] }));
    const pending = await pool.query("SELECT COUNT(*) FROM bookings WHERE LOWER(status)='pending'").catch(() => ({ rows: [{ count: 0 }] }));
    const completed = await pool.query("SELECT COUNT(*) FROM bookings WHERE LOWER(status)='completed'").catch(() => ({ rows: [{ count: 0 }] }));

    const recentBookings = await pool.query(`
      SELECT b.id, COALESCE(s.name, 'Home Service') AS service_category, COALESCE(b.status, 'pending') AS status, COALESCE(b.created_at, NOW()) AS created_at,
        COALESCE(c.name, 'Customer') AS customer_name, COALESCE(t.name, 'Unassigned') AS technician_name
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
      ORDER BY b.id DESC LIMIT 8`).catch(() => ({ rows: [] }));

    res.json({
      stats: {
        totalCustomers: parseInt(customers.rows[0]?.count || 0),
        totalTechnicians: parseInt(technicians.rows[0]?.count || 0),
        totalBookings: parseInt(bookings.rows[0]?.count || 0),
        pendingBookings: parseInt(pending.rows[0]?.count || 0),
        completedBookings: parseInt(completed.rows[0]?.count || 0),
      },
      recentBookings: recentBookings.rows,
    });
  } catch (err) {
    console.error("getDashboard error:", err.message);
    res.status(200).json({
      stats: { totalCustomers: 0, totalTechnicians: 0, totalBookings: 0, pendingBookings: 0, completedBookings: 0 },
      recentBookings: [],
    });
  }
}

module.exports = { getDashboard };
