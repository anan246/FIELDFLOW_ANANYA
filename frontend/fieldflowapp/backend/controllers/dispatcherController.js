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
        COALESCE(category, 'General Technician') AS category,
        COALESCE(category, 'General Technician') AS specialization,
        COALESCE(experience, 1) AS experience,
        COALESCE(working_area, city, address, 'Bengaluru') AS working_area,
        COALESCE(working_area, city, address, 'Bengaluru') AS location,
        COALESCE(available_today, true) AS available_today,
        CASE WHEN available_today = false THEN 'Busy' ELSE 'Available' END AS status
      FROM users
      WHERE LOWER(role) = 'technician'
      ORDER BY id DESC
    `);

    if (result.rows.length === 0) {
      const fallback = await pool.query("SELECT * FROM technicians ORDER BY id DESC").catch(() => ({ rows: [] }));
      return res.status(200).json(fallback.rows);
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("getAvailableTechnicians error:", error);
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
        COALESCE(u.name, 'Customer') AS customer_name,
        COALESCE(u.phone, '9876543210') AS phone,
        COALESCE(s.name, 'Home Repair') AS service_name,
        b.booking_date,
        b.booking_time,
        COALESCE(b.address, u.address, 'Bengaluru') AS address,
        b.status
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN services s ON b.service_id = s.id
      ORDER BY b.id DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("getPendingBookings error:", error);
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

    // Keep the registered technician's availability in sync with the assignment.
    await pool.query(
      `
      UPDATE users
      SET available_today=false
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
    customer_name,
    phone,
    email,
    address,
    city,
    pincode,
    service_name,
    priority,
    booking_date,
    booking_time
  } = req.body;

  try {

    // 1. Find customer by phone
    let user = await pool.query(
      "SELECT id FROM users WHERE phone=$1",
      [phone]
    );

    let user_id;

    if (user.rows.length === 0) {

      const newUser = await pool.query(
        `
        INSERT INTO users
        (
          name,
          email,
          phone,
          role,
          address,
          city,
          pincode
        )
        VALUES
        ($1,$2,$3,'customer',$4,$5,$6)
        RETURNING id
        `,
        [
          customer_name,
          email,
          phone,
          address,
          city,
          pincode
        ]
      );

      user_id = newUser.rows[0].id;

    } else {

      user_id = user.rows[0].id;

    }

    // 2. Find service
    const service = await pool.query(
      "SELECT id FROM services WHERE name=$1",
      [service_name]
    );

    if (service.rows.length === 0) {
      return res.status(404).json({
        success:false,
        message:"Service not found"
      });
    }

    const service_id = service.rows[0].id;

    // 3. Create booking
    const booking = await pool.query(
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

    // 4. Emergency booking
    if(priority === "Emergency"){

      await pool.query(
        `
        INSERT INTO emergency_jobs
        (
          booking_id,
          priority,
          status,
          created_at
        )
        VALUES
        ($1,'Emergency','Pending',NOW())
        `,
        [booking.rows[0].id]
      );

    }

    res.status(201).json({
      success:true,
      message:"Booking Created Successfully",
      booking:booking.rows[0]
    });

  } catch(err){

    console.error(err);

    res.status(500).json({
      success:false,
      message:"Server Error",
      error:err.message
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

        t.id AS technician_id,
        t.name AS technician_name,
        t.phone AS technician_phone,

        s.name AS service_name

      FROM bookings b

      INNER JOIN LATERAL (
        SELECT booking_id, technician_id, assignment_status, assigned_at
        FROM dispatcher_assignments
        WHERE booking_id = b.id
        ORDER BY assigned_at DESC
        LIMIT 1
      ) da ON true

      INNER JOIN users u
        ON b.user_id = u.id

      INNER JOIN users t
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
