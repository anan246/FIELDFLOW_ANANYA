const router = require("express").Router();
const { getAllBookings, updateStatus, assignTechnician } = require("../controllers/bookingsController");
const adminProtect = require("../authMiddleware");

router.get("/", adminProtect, getAllBookings);
router.patch("/:id/status", adminProtect, updateStatus);
router.patch("/:id/assign", adminProtect, assignTechnician);

module.exports = router;
