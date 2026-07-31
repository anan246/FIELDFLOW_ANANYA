const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

// These exist in your branch's backend
const serviceRoutes = require("./routes/serviceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);

// Existing FieldFlow routes
app.use("/api/services", serviceRoutes);
app.use("/api/notifications", notificationRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("FieldFlow Backend Running");
});

// Test database connection
pool.query("SELECT NOW()")
  .then((result) => {
    console.log(
      "Connected to Supabase PostgreSQL:",
      result.rows[0].now
    );
  })
  .catch((err) => {
    console.error(
      "Database Connection Failed:",
      err.message
    );
  });

// Error middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});