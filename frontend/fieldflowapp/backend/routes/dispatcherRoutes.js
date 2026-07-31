const express = require("express");
const router = express.Router();

const {
  // Dashboard
  getDashboardStats,

  // Technicians
  getAvailableTechnicians,

  // Pending Bookings
  getPendingBookings,

  // Assign Technician
  assignTechnician,

  // Assigned Jobs
  getAssignedJobs,

  // Manual Booking
  createManualBooking,

  // Notifications
  getNotifications,
  createNotification,

  // Emergency Jobs
  getEmergencyJobs,
  createEmergencyJob,
  updateEmergencyJob,

  // Job Tracking
  getJobTracking,
  updateJobStatus,

} = require("../controllers/dispatcherController");


// =========================================
// Dashboard
// =========================================
router.get("/dashboard", getDashboardStats);


// =========================================
// Technicians
// =========================================
router.get("/technicians", getAvailableTechnicians);


// =========================================
// Pending Bookings
// =========================================
router.get("/pending-bookings", getPendingBookings);


// =========================================
// Assign Technician
// =========================================
router.post("/assign-technician", assignTechnician);


// =========================================
// Assigned Jobs
// =========================================
router.get("/assigned-jobs", getAssignedJobs);


// =========================================
// Manual Booking
// =========================================
router.post("/manual-booking", createManualBooking);


// =========================================
// Notifications
// =========================================
router.get("/notifications", getNotifications);
router.post("/notifications", createNotification);


// =========================================
// Emergency Jobs
// =========================================
router.get("/emergency-jobs", getEmergencyJobs);
router.post("/emergency-jobs", createEmergencyJob);
router.put("/emergency-jobs/:id", updateEmergencyJob);


// =========================================
// Job Tracking
// =========================================
router.get("/job-tracking", getJobTracking);
router.put("/job-status/:bookingId", updateJobStatus);


module.exports = router;