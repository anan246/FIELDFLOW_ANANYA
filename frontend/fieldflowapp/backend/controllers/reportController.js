const { getBookingReport, getTechnicianReport } = require("../services/reportService");

async function bookingReport(req, res) {
  try {
    const { from = "2024-01-01", to = new Date().toISOString() } = req.query;
    const data = await getBookingReport(from, to);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function technicianReport(req, res) {
  try {
    const data = await getTechnicianReport();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { bookingReport, technicianReport };
