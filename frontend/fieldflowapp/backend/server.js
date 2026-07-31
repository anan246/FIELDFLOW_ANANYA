const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Catch body parse errors (Express 5 throws on malformed JSON)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed")
    return res.status(400).json({ error: "Invalid JSON in request body." });
  next(err);
});

// Database Connection Test
pool.query("SELECT NOW()")
  .then((r) => console.log("✅ Connected to Supabase PostgreSQL:", r.rows[0].now))
  .catch((err) => console.error("❌ Database Connection Failed:", err.message));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/notifications", notificationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("FieldFlow Backend Running");
});

// Test database connection
pool.query("SELECT NOW()")
  .then((result) => {
    console.log("Connected to Supabase PostgreSQL");
    console.log("Database Time:", result.rows[0].now);
  })
  .catch((err) => {
    console.error("Database Connection Failed:");
    console.error(err.message);
  });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});