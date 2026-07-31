const router = require("express").Router();
const pool = require("../config/db");

const {
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");


/*
 * ADMIN USER MANAGEMENT
 */

// Get all users
router.get("/", protect, adminOnly, getAllUsers);

// Get user by ID for admin
router.get("/admin/:id", protect, adminOnly, getUserById);

// Delete user
router.delete("/:id", protect, adminOnly, deleteUser);


/*
 * CUSTOMER / USER PROFILE
 */

// Get user profile
router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        id,
        name,
        email,
        phone,
        address,
        created_at
       FROM users
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("User fetch error:", error.message);

    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
});


module.exports = router;