const pool = require("../../config/db");

async function getAllUsers(req, res) {
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, role, city, created_at FROM users ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
    res.json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllUsers, deleteUser };
