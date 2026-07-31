const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("FieldFlow Backend Running");
});

// Test database connection
pool.query("SELECT NOW()")
  .then((result) => {
    console.log("✅ Connected to Supabase PostgreSQL");
    console.log("Database Time:", result.rows[0].now);
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
  });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});