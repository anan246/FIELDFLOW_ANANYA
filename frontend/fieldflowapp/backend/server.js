const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

// Routes
const contactRoutes = require("./routes/contactRoutes");
const dispatcherRoutes = require("./routes/dispatcherRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 FieldFlow Backend API is Running...");
});

// Check Database Connection
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Database Connected Successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
    });
  }
});

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/dispatcher", dispatcherRoutes);
app.use("/api/booking", bookingRoutes);
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});