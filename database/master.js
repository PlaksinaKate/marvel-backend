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

async function createMaster(name, position, description) {
  const [result] = await pool.query(
    `INSERT INTO master (name, position, description) VALUES (?, ?, ?)`,
    [name, position, description]
  );

  return result.insertId;
}

export const masters = {
  getMasters,
  getMaster,
  createMaster,
};
