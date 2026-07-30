const Technician = require("../models/Technician");

async function getAllTechnicians(req, res) {
  try {
    const result = await Technician.findAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getTechnicianById(req, res) {
  try {
    const result = await Technician.findById(req.params.id);
    if (!result.rows.length) return res.status(404).json({ error: "Technician not found." });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function toggleAvailability(req, res) {
  try {
    const result = await Technician.toggleAvailability(req.params.id, req.body.available);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllTechnicians, getTechnicianById, toggleAvailability };
