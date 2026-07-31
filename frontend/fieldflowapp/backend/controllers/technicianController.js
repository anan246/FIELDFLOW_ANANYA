const Technician = require("../models/Technician");
const Booking = require("../models/Booking");
<<<<<<< HEAD
const JobTracking = require("../models/JobTracking");
=======
>>>>>>> e1b1a6ad1bd5e30c72bb710ef51f830938a2a5b1

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

<<<<<<< HEAD
    const result = await Booking.findByTechnician(technicianId);

    const myBookings = result.rows;

    const dashboard = {
      assignedJobs: myBookings.filter(
        (b) => b.status === "assigned"
      ).length,

      inProgress: myBookings.filter(
        (b) => b.status === "in_progress"
      ).length,

      completed: myBookings.filter(
        (b) => b.status === "completed"
      ).length,

      todayJobs: myBookings.filter((b) => {
        if (!b.scheduled_at) return false;

        const today = new Date().toDateString();
        return new Date(b.scheduled_at).toDateString() === today;
=======
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
>>>>>>> e1b1a6ad1bd5e30c72bb710ef51f830938a2a5b1
      }).length,
    };

    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

<<<<<<< HEAD
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
      await JobTracking.upsert(req.params.id, req.user.id, status);
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

module.exports = { getAllTechnicians, getTechnicianById, toggleAvailability, getDashboard, getMyJobs, getJobById, updateJobStatus, updateAvailability };
=======
module.exports = { getAllTechnicians, getTechnicianById, toggleAvailability, getDashboard };
>>>>>>> e1b1a6ad1bd5e30c72bb710ef51f830938a2a5b1
