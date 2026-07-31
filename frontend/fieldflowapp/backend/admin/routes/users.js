const router = require("express").Router();
const { getAllUsers, deleteUser } = require("../controllers/usersController");
const adminProtect = require("../authMiddleware");

router.get("/", adminProtect, getAllUsers);
router.delete("/:id", adminProtect, deleteUser);

module.exports = router;
