const Technician = require("../models/Technician");
const Booking = require("../models/Booking");
const JobTracking = require("../models/JobTracking");

async function getMyProfile(req, res) {
  try {
    const result = await Technician.findById(req.user.id);
    if (!result.rows.length)
      return res.status(404).json({ error: "Technician not found." });
    const u = result.rows[0];
    res.json({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      category: u.category,
      experience: u.experience,
      workingArea: u.working_area,
      availableToday: u.available_today,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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

    const result = await Booking.findByTechnician(technicianId);
    const myBookings = result.rows;

    const today = new Date().toDateString();

    const dashboard = {
      assignedJobs: myBookings.filter(
        (b) => b.status === "assigned" || b.status === "Assigned"
      ).length,

      inProgress: myBookings.filter(
        (b) => b.status === "in_progress" || b.status === "In Progress"
      ).length,

      completed: myBookings.filter(
        (b) => b.status === "completed" || b.status === "Completed"
      ).length,

      todayJobs: myBookings.filter((b) => {
        const dateVal = b.scheduled_at || b.booking_date;
        if (!dateVal) return false;
        return new Date(dateVal).toDateString() === today;
      }).length,
    };

    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMyJobs(req, res) {
  try {
    const result = await Booking.findByTechnicianWithDetails(req.user.id);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getJobById(req, res) {
  try {
    const result = await Booking.findByIdForTechnician(req.params.id, req.user.id);
    if (!result.rows.length)
      return res.status(404).json({ error: "Job not found or not assigned to you." });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const ALLOWED_STATUSES = ["Assigned", "Accepted", "On The Way", "In Progress", "Completed", "Cancelled"];

async function updateJobStatus(req, res) {
  const { status } = req.body;
  if (!ALLOWED_STATUSES.includes(status))
    return res.status(400).json({ error: `Invalid status. Allowed: ${ALLOWED_STATUSES.join(", ")}` });

  try {
    const check = await Booking.findByIdForTechnician(req.params.id, req.user.id);
    if (!check.rows.length)
      return res.status(404).json({ error: "Job not found or not assigned to you." });

    const updated = await Booking.updateBookingStatus(req.params.id, status);

    try {
      if (JobTracking && JobTracking.upsert) {
        await JobTracking.upsert(req.params.id, req.user.id, status);
      }
    } catch (_) {
      // job_tracking update is best-effort
    }

    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateAvailability(req, res) {
  try {
    const result = await Technician.updateAvailability(req.user.id, req.body.available);
    if (!result.rows.length)
      return res.status(404).json({ error: "Technician not found." });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getMyProfile,
  getAllTechnicians,
  getTechnicianById,
  toggleAvailability,
  getDashboard,
  getMyJobs,
  getJobById,
  updateJobStatus,
  updateAvailability,
};
