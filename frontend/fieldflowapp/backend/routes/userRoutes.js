const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/:id", async (req, res) => {
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