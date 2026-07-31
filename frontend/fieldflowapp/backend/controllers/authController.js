const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

async function register(req, res) {
  const {
    name, email, phone, password, role,
    // customer
    address, city, pincode,
    // technician
    category, experience, workingArea, availableToday,
    // dispatcher
    employeeId, officeBranch,
    // admin
    inviteCode,
  } = req.body;

  try {
    // Check duplicate email
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0)
      return res.status(409).json({ error: "Email already registered." });

    // Validate admin invite code
    if (role === "admin" && inviteCode !== process.env.ADMIN_INVITE_CODE)
      return res.status(403).json({ error: "Invalid admin invite code." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
        (name, email, phone, password, role,
         address, city, pincode,
         category, experience, working_area, available_today,
         employee_id, office_branch,
         invite_code)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING id, name, email, phone, role,
         address, city, pincode,
         category, experience, working_area, available_today,
         employee_id, office_branch, created_at`,
      [
        name, email, phone, hashedPassword, role,
        address || null, city || null, pincode || null,
        category || null, experience || null, workingArea || null, availableToday || false,
        employeeId || null, officeBranch || null,
        role === "admin" ? inviteCode : null,
      ]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registration successful.",
      token,
      user,
    });

  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
}

module.exports = { register };
