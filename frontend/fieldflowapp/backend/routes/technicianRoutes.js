const router = require("express").Router();
<<<<<<< HEAD
const { getAllTechnicians, getTechnicianById, toggleAvailability, getDashboard, getMyJobs, getJobById, updateJobStatus, updateAvailability } = require("../controllers/technicianController");
=======
const { getAllTechnicians, getTechnicianById, toggleAvailability, getDashboard } = require("../controllers/technicianController");
>>>>>>> e1b1a6ad1bd5e30c72bb710ef51f830938a2a5b1
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAllTechnicians);
router.get("/me/dashboard", protect, getDashboard);
<<<<<<< HEAD
router.get("/me/jobs", protect, getMyJobs);
router.patch("/me/availability", protect, updateAvailability);
router.get("/jobs/:id", protect, getJobById);
router.patch("/jobs/:id/status", protect, updateJobStatus);
=======
>>>>>>> e1b1a6ad1bd5e30c72bb710ef51f830938a2a5b1
router.get("/:id", protect, adminOnly, getTechnicianById);
router.patch("/:id/availability", protect, adminOnly, toggleAvailability);

module.exports = router;
