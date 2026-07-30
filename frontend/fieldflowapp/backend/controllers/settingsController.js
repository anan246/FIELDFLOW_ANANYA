const Service = require("../models/Service");

async function getServices(req, res) {
  try {
    const result = await Service.findAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createService(req, res) {
  try {
    const result = await Service.create(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateService(req, res) {
  try {
    const result = await Service.update(req.params.id, req.body);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteService(req, res) {
  try {
    await Service.delete(req.params.id);
    res.json({ message: "Service deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getServices, createService, updateService, deleteService };
