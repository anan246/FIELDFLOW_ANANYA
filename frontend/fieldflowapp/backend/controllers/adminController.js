const { getDashboardStats, getRecentBookings } = require("../services/dashboardService");

async function getDashboard(req, res) {
  try {
    const [stats, recentBookings] = await Promise.all([getDashboardStats(), getRecentBookings()]);
    res.json({ stats, recentBookings });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to load dashboard." });
  }
}

module.exports = { getDashboard };
