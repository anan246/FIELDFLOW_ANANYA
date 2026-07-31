const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const authRoutes = require("./routes/auth");
const technicianRoutes = require("./routes/technicianRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/technicians", technicianRoutes);

pool.query("SELECT NOW()")
  .then((result) => {
    console.log("✅ Connected to Supabase PostgreSQL");
    console.log("Database Time:", result.rows[0].now);
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed");
    console.error(err.message);
  });

app.get("/", (req, res) => {
  res.send("FieldFlow Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});