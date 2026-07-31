const pool = require("../config/db");

const JobTracking = {
  upsert: async (bookingId, technicianId, status) => {
    const existing = await pool.query(
      "SELECT id FROM job_tracking WHERE booking_id = $1",
      [bookingId]
    );

    if (existing.rows.length > 0) {
      return pool.query(
        `UPDATE job_tracking
         SET current_status=$1, technician_id=$2, updated_at=NOW()
         WHERE booking_id=$3
         RETURNING *`,
        [status, technicianId, bookingId]
      );
    } else {
      return pool.query(
        `INSERT INTO job_tracking (booking_id, technician_id, current_status, updated_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING *`,
        [bookingId, technicianId, status]
      );
    }
  },
};

module.exports = JobTracking;
