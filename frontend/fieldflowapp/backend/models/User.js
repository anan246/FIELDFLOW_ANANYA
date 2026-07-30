const pool = require("../config/db");

const User = {
  findAll: () => pool.query("SELECT id, name, email, phone, role, city, created_at FROM users ORDER BY created_at DESC"),
  findById: (id) => pool.query("SELECT id, name, email, phone, role, city, created_at FROM users WHERE id=$1", [id]),
  findByEmail: (email) => pool.query("SELECT * FROM users WHERE email=$1", [email]),
  countByRole: (role) => pool.query("SELECT COUNT(*) FROM users WHERE role=$1", [role]),
  delete: (id) => pool.query("DELETE FROM users WHERE id=$1", [id]),
  update: (id, fields) => {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const set = keys.map((k, i) => `${k}=$${i + 1}`).join(", ");
    return pool.query(`UPDATE users SET ${set} WHERE id=$${keys.length + 1} RETURNING *`, [...values, id]);
  },
};

module.exports = User;
