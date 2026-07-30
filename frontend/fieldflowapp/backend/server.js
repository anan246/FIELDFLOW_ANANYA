const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");

const authRoutes       = require("./routes/auth");
const adminRoutes      = require("./routes/adminRoutes");
const userRoutes       = require("./routes/userRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const bookingRoutes    = require("./routes/bookingRoutes");
const reportRoutes     = require("./routes/reportRoutes");
const settingsRoutes   = require("./routes/settingsRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

pool.query("SELECT NOW()")
  .then((r) => console.log("✅ Connected to Supabase PostgreSQL:", r.rows[0].now))
  .catch((err) => console.error("❌ Database Connection Failed:", err.message));

app.use("/api/auth",        authRoutes);
app.use("/api/admin",       adminRoutes);
app.use("/api/users",       userRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/bookings",    bookingRoutes);
app.use("/api/reports",     reportRoutes);
app.use("/api/settings",    settingsRoutes);

app.get("/", (req, res) => res.send("FieldFlow Backend Running"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
