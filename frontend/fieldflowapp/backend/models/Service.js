const pool = require("../config/db");

const createServicesTable = `
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  base_price NUMERIC(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);`;

pool.query(createServicesTable).catch(console.error);

const Service = {
  findAll: () => pool.query("SELECT * FROM services ORDER BY created_at DESC"),
  findById: (id) => pool.query("SELECT * FROM services WHERE id=$1", [id]),
  create: (data) => pool.query(
    "INSERT INTO services (name, category, description, base_price) VALUES ($1,$2,$3,$4) RETURNING *",
    [data.name, data.category, data.description, data.basePrice]
  ),
  update: (id, data) => pool.query(
    "UPDATE services SET name=$1, category=$2, description=$3, base_price=$4, is_active=$5 WHERE id=$6 RETURNING *",
    [data.name, data.category, data.description, data.basePrice, data.isActive, id]
  ),
  delete: (id) => pool.query("DELETE FROM services WHERE id=$1", [id]),
};

module.exports = Service;
