const pool = require("../config/db");

const createNotificationsTable = `
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);`;

pool.query(createNotificationsTable).catch(console.error);

const Notification = {
  findByUser: (userId) => pool.query("SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC", [userId]),
  create: (userId, message) => pool.query(
    "INSERT INTO notifications (user_id, message) VALUES ($1,$2) RETURNING *", [userId, message]
  ),
  markRead: (id) => pool.query("UPDATE notifications SET is_read=TRUE WHERE id=$1", [id]),
  markAllRead: (userId) => pool.query("UPDATE notifications SET is_read=TRUE WHERE user_id=$1", [userId]),
};

module.exports = Notification;
