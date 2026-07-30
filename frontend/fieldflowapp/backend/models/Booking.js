const pool = require("../config/db");

const createBookingsTable = `
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  technician_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  service_category VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(30) DEFAULT 'pending',
  address TEXT,
  city VARCHAR(100),
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);`;

pool.query(createBookingsTable).catch(console.error);

const Booking = {
  findAll: () => pool.query(`
    SELECT b.*, 
      c.name AS customer_name, c.phone AS customer_phone,
      t.name AS technician_name
    FROM bookings b
    LEFT JOIN users c ON b.customer_id = c.id
    LEFT JOIN users t ON b.technician_id = t.id
    ORDER BY b.created_at DESC`),
  findById: (id) => pool.query("SELECT * FROM bookings WHERE id=$1", [id]),
  create: (data) => pool.query(
    `INSERT INTO bookings (customer_id, service_category, description, address, city, scheduled_at)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.customerId, data.serviceCategory, data.description, data.address, data.city, data.scheduledAt]
  ),
  updateStatus: (id, status) => pool.query("UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *", [status, id]),
  assignTechnician: (id, technicianId) => pool.query(
    "UPDATE bookings SET technician_id=$1, status='assigned' WHERE id=$2 RETURNING *", [technicianId, id]
  ),
  countByStatus: (status) => pool.query("SELECT COUNT(*) FROM bookings WHERE status=$1", [status]),
};

module.exports = Booking;
