const pool = require("../config/db");

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const query = `
      INSERT INTO contact_messages
      (name, email, phone, subject, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [name, email, phone, subject, message];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { submitContact };