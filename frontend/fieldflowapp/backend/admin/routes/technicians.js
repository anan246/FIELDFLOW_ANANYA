const router = require("express").Router();
const { getAllTechnicians, toggleAvailability } = require("../controllers/techniciansController");
const adminProtect = require("../authMiddleware");

router.get("/", adminProtect, getAllTechnicians);
router.patch("/:id/availability", adminProtect, toggleAvailability);

module.exports = router;
