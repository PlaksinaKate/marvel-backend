import { pool } from "./pool.js";

async function getMasters() {
  const [rows] = await pool.query("SELECT * FROM master");
  return rows;
}

async function getMaster(id) {
  const [rows] = await pool.query(`SELECT * FROM master WHERE id_master = ?`, [
    id,
  ]);
  return rows[0];
}

async function createMaster(name, position, description, password) {
  const [result] = await pool.query(
    `INSERT INTO master (name, position, description, password) VALUES (?, ?, ?, ?)`,
    [name, position, description, password]
  );

  return result.insertId;
}

async function updateMaster(id, name, position, description) {
  const [result] = await pool.query(
    `UPDATE master SET name=?, position=?, description=? WHERE id_master = ?`,
    [name, position, description, id]
  );

  return result.insertId;
}

export const masters = {
  getMasters,
  getMaster,
  createMaster,
  updateMaster,
};
