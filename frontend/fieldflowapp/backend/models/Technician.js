const pool = require("../config/db");

const Technician = {
  findAll: () => pool.query(
    "SELECT id, name, email, phone, category, experience, working_area, available_today, created_at FROM users WHERE role='technician' ORDER BY created_at DESC"
  ),
  findById: (id) => pool.query(
    "SELECT id, name, email, phone, category, experience, working_area, available_today FROM users WHERE id=$1 AND role='technician'", [id]
  ),
  toggleAvailability: (id, available) => pool.query(
    "UPDATE users SET available_today=$1 WHERE id=$2 RETURNING *", [available, id]
  ),
};

module.exports = Technician;
