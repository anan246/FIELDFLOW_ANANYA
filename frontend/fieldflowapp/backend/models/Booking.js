const pool = require("../config/db");

const Booking = {
  findAll: () => pool.query(`
    SELECT *
    FROM bookings
    ORDER BY created_at DESC
  `),
  findById: (id) => pool.query("SELECT * FROM bookings WHERE id=$1", [id]),
  updateStatus: (id, status) => pool.query("UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *", [status, id]),
  countByStatus: (status) => pool.query("SELECT COUNT(*) FROM bookings WHERE status=$1", [status]),
  findByTechnician: (technicianId) =>
    pool.query(
      `SELECT b.*
       FROM bookings b
       JOIN dispatcher_assignments da
         ON da.booking_id = b.id
       WHERE da.technician_id = $1
       ORDER BY b.created_at DESC`,
      [technicianId]
    ),

  findByTechnicianWithDetails: (technicianId) =>
    pool.query(
      `SELECT
         b.id           AS "bookingId",
         s.name         AS "serviceName",
         u.name         AS "customerName",
         b.booking_date AS "bookingDate",
         b.booking_time AS "bookingTime",
         b.address,
         b.status
       FROM dispatcher_assignments da
       JOIN bookings b  ON b.id  = da.booking_id
       JOIN services s  ON s.id  = b.service_id
       JOIN users u     ON u.id  = b.user_id
       WHERE da.technician_id = $1
       ORDER BY b.booking_date DESC, b.booking_time DESC`,
      [technicianId]
    ),

  findByIdForTechnician: (bookingId, technicianId) =>
    pool.query(
      `SELECT
         b.*,
         u.name  AS customer_name,
         u.email AS customer_email,
         u.phone AS customer_phone,
         s.name  AS service_name,
         da.assigned_at,
         da.assignment_status
       FROM dispatcher_assignments da
       JOIN bookings b ON b.id = da.booking_id
       JOIN users u    ON u.id = b.user_id
       JOIN services s ON s.id = b.service_id
       WHERE da.booking_id = $1 AND da.technician_id = $2`,
      [bookingId, technicianId]
    ),

  updateBookingStatus: (id, status) =>
    pool.query(
      `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    ),
};

module.exports = Booking;
