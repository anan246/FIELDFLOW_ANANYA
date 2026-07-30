const router = require("express").Router();
const { getAllBookings, getBookingById, updateBookingStatus, assignTechnician } = require("../controllers/bookingController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAllBookings);
router.get("/:id", protect, adminOnly, getBookingById);
router.patch("/:id/status", protect, adminOnly, updateBookingStatus);
router.patch("/:id/assign", protect, adminOnly, assignTechnician);

module.exports = router;
