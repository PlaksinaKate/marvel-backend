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

async function createClient(name, phone) {
  const [result] = await pool.query(
    `INSERT INTO client (name, phone) VALUES (?, ?)`,
    [name, phone]
  );

  return result.insertId;
}

export const clients = {
  getClients,
  getClient,
  createClient,
};
