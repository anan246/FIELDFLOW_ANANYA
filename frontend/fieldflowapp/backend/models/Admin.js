const pool = require("../config/db");

const Admin = {
  findById: (id) => pool.query("SELECT id, name, email, role FROM users WHERE id=$1 AND role='admin'", [id]),
  findAll: () => pool.query("SELECT id, name, email, created_at FROM users WHERE role='admin'"),
};

module.exports = Admin;
