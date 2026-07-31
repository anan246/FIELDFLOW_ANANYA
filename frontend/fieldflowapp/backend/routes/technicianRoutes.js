const router = require("express").Router();
const {
  getAllTechnicians,
  getTechnicianById,
  toggleAvailability,
  getDashboard,
  getMyJobs,
  getJobById,
  updateJobStatus,
  updateAvailability,
  getMyProfile
} = require("../controllers/technicianController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAllTechnicians);
router.get("/me/profile", protect, getMyProfile);
router.get("/me/dashboard", protect, getDashboard);
router.get("/me/jobs", protect, getMyJobs);
router.patch("/me/availability", protect, updateAvailability);
router.get("/jobs/:id", protect, getJobById);
router.patch("/jobs/:id/status", protect, updateJobStatus);
router.get("/:id", protect, adminOnly, getTechnicianById);
router.patch("/:id/availability", protect, adminOnly, toggleAvailability);

module.exports = router;
