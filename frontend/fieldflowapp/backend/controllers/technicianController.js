const Technician = require("../models/Technician");
const Booking = require("../models/Booking");

async function getAllTechnicians(req, res) {
  try {
    const result = await Technician.findAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTechnicianById(req, res) {
  try {
    const result = await Technician.findById(req.params.id);
    if (!result.rows.length) return res.status(404).json({ error: "Technician not found." });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function toggleAvailability(req, res) {
  try {
    const result = await Technician.toggleAvailability(req.params.id, req.body.available);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getDashboard(req, res) {
  try {
    const technicianId = req.user.id;

    const bookings = await Booking.findAll();

    const myBookings = bookings.rows.filter(
      (job) => job.technician_id === technicianId
    );

    const today = new Date().toDateString();

    const dashboard = {
      assignedJobs: myBookings.length,

      inProgress: myBookings.filter(
        (job) => job.status === "In Progress"
      ).length,

      completed: myBookings.filter(
        (job) => job.status === "Completed"
      ).length,

      todayJobs: myBookings.filter((job) => {
        if (!job.scheduled_at) return false;
        return new Date(job.scheduled_at).toDateString() === today;
      }).length,
    };

    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllTechnicians, getTechnicianById, toggleAvailability, getDashboard };
