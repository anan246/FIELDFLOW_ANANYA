const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// Get notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT
        n.id,
        n.user_id,
        n.message,
        n.is_read,
        n.created_at,
        n.booking_id,

        b.status AS booking_status,
        s.name AS service_name

      FROM notifications n

      LEFT JOIN bookings b
        ON n.booking_id = b.id

      LEFT JOIN services s
        ON b.service_id = s.id

      WHERE n.user_id = $1

      ORDER BY n.created_at DESC
      `,
      [userId]
    );

    res.json({
      notifications: result.rows,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
});


// Mark notification as read
router.patch("/:notificationId/read", async (req, res) => {
  try {
    const { notificationId } = req.params;

    const result = await pool.query(
      `
      UPDATE notifications
      SET is_read = true
      WHERE id = $1
      RETURNING *
      `,
      [notificationId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json({
      message: "Notification marked as read",
      notification: result.rows[0],
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
});


module.exports = router;