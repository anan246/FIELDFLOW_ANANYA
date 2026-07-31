const pool = require("../config/db");

// ============================================
// Dashboard Statistics
// ============================================
const getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await pool.query(
      "SELECT COUNT(*) FROM bookings"
    );

    const pendingBookings = await pool.query(
      "SELECT COUNT(*) FROM bookings WHERE status='Pending'"
    );

    const availableTechnicians = await pool.query(
      "SELECT COUNT(*) FROM technicians WHERE status='Available'"
    );

    const emergencyJobs = await pool.query(
      "SELECT COUNT(*) FROM emergency_jobs"
    );

    res.status(200).json({
      totalBookings: Number(totalBookings.rows[0].count),
      pendingBookings: Number(pendingBookings.rows[0].count),
      availableTechnicians: Number(
        availableTechnicians.rows[0].count
      ),
      emergencyJobs: Number(
        emergencyJobs.rows[0].count
      )
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics"
    });

  }
};

// ============================================
// Get Available Technicians
// ============================================
// ============================================
// Get Available Technicians
// ============================================
const getAvailableTechnicians = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        phone,
        specialization,
        rating,
        jobs_completed,
        experience,
        status
      FROM technicians
      ORDER BY id ASC
    `);

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch technicians"
    });

  }

};

// ============================================
// Get Pending Bookings
// ============================================
const getPendingBookings = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        b.id,
        u.name AS customer_name,
        u.phone,
        s.name AS service_name,
        b.booking_date,
        b.booking_time,
        b.address,
        b.status

      FROM bookings b

      INNER JOIN users u
        ON b.user_id = u.id

      INNER JOIN services s
        ON b.service_id = s.id

      WHERE b.status='Pending'

      ORDER BY b.booking_date DESC
    `);

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pending bookings"
    });

  }

};
// ============================================
// Assign Technician
// ============================================
const assignTechnician = async (req, res) => {

  const {
    booking_id,
    technician_id,
    assigned_by
  } = req.body;

  try {

    // Create Assignment
    await pool.query(
      `
      INSERT INTO dispatcher_assignments
      (
        booking_id,
        technician_id,
        assigned_at,
        assigned_by,
        assignment_status
      )
      VALUES
      ($1,$2,NOW(),$3,'Assigned')
      `,
      [booking_id, technician_id, assigned_by]
    );

    // Update Booking Status
    await pool.query(
      `
      UPDATE bookings
      SET status='Assigned'
      WHERE id=$1
      `,
      [booking_id]
    );

    // Update Technician Status
    await pool.query(
      `
      UPDATE technicians
      SET status='Busy'
      WHERE id=$1
      `,
      [technician_id]
    );

    res.status(200).json({
      success: true,
      message: "Technician assigned successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to assign technician",
      error: error.message
    });

  }

};

// ============================================
// Get Assigned Jobs
// ============================================
const getAssignedJobs = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT

        da.id,
        da.booking_id,
        da.assigned_at,
        da.assigned_by,
        da.assignment_status,

        t.id AS technician_id,
        t.name AS technician_name,
        t.phone AS technician_phone,

        u.name AS customer_name,
        u.phone AS customer_phone,

        s.name AS service_name,

        b.address,
        b.booking_date,
        b.booking_time,
        b.status

      FROM dispatcher_assignments da

      INNER JOIN technicians t
        ON da.technician_id = t.id

      INNER JOIN bookings b
        ON da.booking_id = b.id

      INNER JOIN users u
        ON b.user_id = u.id

      INNER JOIN services s
        ON b.service_id = s.id

      ORDER BY da.assigned_at DESC
    `);

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assigned jobs",
      error: error.message
    });

  }

};
// ============================================
// Create Manual Booking
// ============================================
const createManualBooking = async (req, res) => {

  const {
    user_id,
    service_id,
    booking_date,
    booking_time,
    address
  } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO bookings
      (
        user_id,
        service_id,
        booking_date,
        booking_time,
        status,
        address
      )
      VALUES
      ($1,$2,$3,$4,'Pending',$5)
      RETURNING *
      `,
      [
        user_id,
        service_id,
        booking_date,
        booking_time,
        address
      ]
    );

    res.status(201).json({
      success: true,
      message: "Manual booking created successfully",
      booking: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create manual booking",
      error: error.message
    });

  }

};

// ============================================
// Get Notifications
// ============================================
const getNotifications = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        id,
        user_id,
        message,
        is_read,
        created_at
      FROM notifications
      ORDER BY created_at DESC
    `);

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message
    });

  }

};

// ============================================
// Create Notification
// ============================================
const createNotification = async (req, res) => {

  const {
    user_id,
    message
  } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO notifications
      (
        user_id,
        message,
        is_read
      )
      VALUES
      ($1,$2,false)
      RETURNING *
      `,
      [
        user_id,
        message
      ]
    );

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create notification",
      error: error.message
    });

  }

};
// ============================================
// Get Emergency Jobs
// ============================================
const getEmergencyJobs = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT

        ej.id,
        ej.booking_id,
        ej.priority,
        ej.status AS emergency_status,
        ej.created_at,

        b.booking_date,
        b.booking_time,
        b.address,

        u.name AS customer_name,
        u.phone,

        s.name AS service_name

      FROM emergency_jobs ej

      INNER JOIN bookings b
        ON ej.booking_id = b.id

      INNER JOIN users u
        ON b.user_id = u.id

      INNER JOIN services s
        ON b.service_id = s.id

      ORDER BY ej.created_at DESC
    `);

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency jobs",
      error: error.message
    });

  }

};

// ============================================
// Create Emergency Job
// ============================================
const createEmergencyJob = async (req, res) => {

  const {
    booking_id,
    priority,
    status
  } = req.body;

  try {

    const result = await pool.query(
      `
      INSERT INTO emergency_jobs
      (
        booking_id,
        priority,
        status,
        created_at
      )
      VALUES
      ($1,$2,$3,NOW())
      RETURNING *
      `,
      [
        booking_id,
        priority,
        status
      ]
    );

    res.status(201).json({
      success: true,
      message: "Emergency job created successfully",
      emergencyJob: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create emergency job",
      error: error.message
    });

  }

};

// ============================================
// Update Emergency Job
// ============================================
const updateEmergencyJob = async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  try {

    const result = await pool.query(
      `
      UPDATE emergency_jobs
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Emergency job not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency job updated successfully",
      emergencyJob: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update emergency job",
      error: error.message
    });

  }

};
// ============================================
// Get Job Tracking
// ============================================
const getJobTracking = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT

        b.id AS booking_id,
        b.booking_date,
        b.booking_time,
        b.address,
        b.status AS booking_status,

        da.assignment_status,
        da.assigned_at,

        u.name AS customer_name,
        u.phone AS customer_phone,

        t.name AS technician_name,
        t.phone AS technician_phone,

        s.name AS service_name

      FROM bookings b

      INNER JOIN dispatcher_assignments da
        ON b.id = da.booking_id

      INNER JOIN users u
        ON b.user_id = u.id

      INNER JOIN technicians t
        ON da.technician_id = t.id

      INNER JOIN services s
        ON b.service_id = s.id

      ORDER BY da.assigned_at DESC
    `);

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch job tracking",
      error: error.message
    });

  }

};

// ============================================
// Update Job Status
// ============================================
const updateJobStatus = async (req, res) => {

  const { bookingId } = req.params;
  const { status } = req.body;

  try {

    const result = await pool.query(
      `
      UPDATE bookings
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, bookingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      booking: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update job status",
      error: error.message
    });

  }

};

// ============================================
// Export Functions
// ============================================
module.exports = {
  getDashboardStats,
  getAvailableTechnicians,
  getPendingBookings,
  assignTechnician,
  getAssignedJobs,
  createManualBooking,
  getNotifications,
  createNotification,
  getEmergencyJobs,
  createEmergencyJob,
  updateEmergencyJob,
  getJobTracking,
  updateJobStatus
};