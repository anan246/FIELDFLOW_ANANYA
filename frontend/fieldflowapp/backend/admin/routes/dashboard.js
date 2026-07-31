const router = require("express").Router();
const { getDashboard } = require("../controllers/dashboardController");
const adminProtect = require("../authMiddleware");

router.get("/", adminProtect, getDashboard);

module.exports = router;
