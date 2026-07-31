const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dispatcherRoutes = require("./routes/dispatcherRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Database Connection Test
pool.query("SELECT NOW()")
  .then((result) => {
    console.log("✅ Connected to Supabase PostgreSQL");
    console.log("Database Time:", result.rows[0].now);
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
  });

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dispatcher", dispatcherRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/notifications", notificationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 FieldFlow Backend Running");
});

// Database Test Route
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Database Connected Successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});