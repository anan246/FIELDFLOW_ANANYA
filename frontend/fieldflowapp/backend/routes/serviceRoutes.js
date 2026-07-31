const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// Get all service categories
router.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM categories
      ORDER BY id
    `);

    res.json({
      categories: result.rows,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
});

// Get all services
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.*,
        c.name AS category_name
      FROM services s
      JOIN categories c ON s.category_id = c.id
      ORDER BY s.id
    `);

    res.json({
      services: result.rows,
    });
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
  }
});

// Get services by category
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const result = await pool.query(
      `
      SELECT
        s.*,
        c.name AS category_name
      FROM services s
      JOIN categories c ON s.category_id = c.id
      WHERE s.category_id = $1
      ORDER BY s.id
      `,
      [categoryId]
    );

    res.json({
      services: result.rows,
    });
  } catch (error) {
    console.error("Get category services error:", error);

    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
  }
});

module.exports = router;