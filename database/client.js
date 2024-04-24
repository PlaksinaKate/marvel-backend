import { pool } from "./pool.js";

async function getClients() {
  const [rows] = await pool.query("SELECT * FROM client");
  return rows;
}

async function getClient(id) {
  const [rows] = await pool.query(`SELECT * FROM client WHERE id_client = ?`, [
    id,
  ]);
  return rows[0];
}

async function createClient(name, phone, password) {
  const [result] = await pool.query(
    `INSERT INTO client (name, phone, password) VALUES (?, ?, ?)`,
    [name, phone, password]
  );

  return result.insertId;
}

export const clients = {
  getClients,
  getClient,
  createClient,
};
