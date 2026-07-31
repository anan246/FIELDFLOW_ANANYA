const router = require("express").Router();
const { getAllTechnicians, getTechnicianById, toggleAvailability, getDashboard } = require("../controllers/technicianController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAllTechnicians);
router.get("/me/dashboard", protect, getDashboard);
router.get("/:id", protect, adminOnly, getTechnicianById);
router.patch("/:id/availability", protect, adminOnly, toggleAvailability);

module.exports = router;
