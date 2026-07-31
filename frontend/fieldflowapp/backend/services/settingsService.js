const pool = require("../config/db");

// Ensure user_preferences row exists for user, create defaults if missing
async function ensurePreferences(userId) {
  const existing = await pool.query(
    "SELECT * FROM user_preferences WHERE user_id = $1",
    [userId]
  );
  if (existing.rows.length > 0) return existing.rows[0];

  const created = await pool.query(
    `INSERT INTO user_preferences (user_id) VALUES ($1) RETURNING *`,
    [userId]
  );
  return created.rows[0];
}

async function getProfile(userId) {
  const result = await pool.query(
    "SELECT id, name, email, phone, role, city, address, pincode, created_at FROM users WHERE id = $1",
    [userId]
  );
  return result.rows[0];
}

async function updateProfile(userId, { name, phone, city, address, pincode }) {
  const result = await pool.query(
    `UPDATE users SET
      name    = COALESCE($1, name),
      phone   = COALESCE($2, phone),
      city    = COALESCE($3, city),
      address = COALESCE($4, address),
      pincode = COALESCE($5, pincode)
     WHERE id = $6
     RETURNING id, name, email, phone, role, city, address, pincode`,
    [name || null, phone || null, city || null, address || null, pincode || null, userId]
  );
  return result.rows[0];
}

async function updatePassword(userId, hashedPassword) {
  await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [hashedPassword, userId]
  );
}

async function getPreferences(userId) {
  return await ensurePreferences(userId);
}

async function updatePreferences(userId, fields) {
  await ensurePreferences(userId);
  const allowed = [
    "theme",
    "language",
    "email_notifications",
    "push_notifications",
    "marketing_notifications",
    "privacy_profile_visibility"
  ];
  
  const updates = [];
  const values = [];
  let paramIndex = 1;

  for (const key of allowed) {
    if (fields[key] !== undefined) {
      updates.push(`${key} = $${paramIndex++}`);
      values.push(fields[key]);
    }
  }

  if (!updates.length) {
    return await ensurePreferences(userId);
  }

  updates.push(`updated_at = NOW()`);
  values.push(userId);

  const query = `UPDATE user_preferences SET ${updates.join(", ")} WHERE user_id = $${paramIndex} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  getPreferences,
  updatePreferences
};
