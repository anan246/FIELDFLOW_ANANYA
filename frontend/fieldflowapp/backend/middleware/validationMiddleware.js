function validateRegister(req, res, next) {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role)
    return res.status(400).json({ error: "Name, email, phone, password and role are required." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: "Invalid email address." });
  if (password.length < 6)
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  const validRoles = ["customer", "technician", "dispatcher", "admin"];
  if (!validRoles.includes(role))
    return res.status(400).json({ error: "Invalid role." });
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required." });
  next();
}

module.exports = { validateRegister, validateLogin };
