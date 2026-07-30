const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const pool = require("../config/db");
const dashboardRoutes   = require("./routes/dashboard");
const usersRoutes       = require("./routes/users");
const techniciansRoutes = require("./routes/technicians");
const bookingsRoutes    = require("./routes/bookings");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

pool.query("SELECT NOW()")
  .then((r) => console.log("✅ Admin server connected to Supabase:", r.rows[0].now))
  .catch((e) => console.error("❌ DB connection failed:", e.message));

app.use("/api/admin/dashboard",   dashboardRoutes);
app.use("/api/admin/users",       usersRoutes);
app.use("/api/admin/technicians", techniciansRoutes);
app.use("/api/admin/bookings",    bookingsRoutes);

app.get("/", (req, res) => res.send("FieldFlow Admin Backend Running"));

const PORT = process.env.ADMIN_PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Admin server running on port ${PORT}`));
