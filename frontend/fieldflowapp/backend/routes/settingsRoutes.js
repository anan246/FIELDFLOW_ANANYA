const router = require("express").Router();
const { getServices, createService, updateService, deleteService } = require("../controllers/settingsController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/services", protect, adminOnly, getServices);
router.post("/services", protect, adminOnly, createService);
router.put("/services/:id", protect, adminOnly, updateService);
router.delete("/services/:id", protect, adminOnly, deleteService);

module.exports = router;
