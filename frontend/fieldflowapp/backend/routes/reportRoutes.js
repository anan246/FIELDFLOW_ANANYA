const router = require("express").Router();
const { bookingReport, technicianReport } = require("../controllers/reportController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/bookings", protect, adminOnly, bookingReport);
router.get("/technicians", protect, adminOnly, technicianReport);

module.exports = router;
