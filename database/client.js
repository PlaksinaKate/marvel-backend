import { pool } from "./pool.js";

async function getClients() {
  const [rows] = await pool.query("SELECT * FROM client");
  return rows;
}

async function getClient(id) {
  const [rows] = await pool.query(`SELECT * FROM client WHERE id = ?`, [
    id,
  ]);
  return rows[0];
}

async function getClientByPhone(email) {
  const [rows] = await pool.query(`SELECT * FROM client WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

async function createClient(name, email, password) {
  const [result] = await pool.query(
    `INSERT INTO client (name, email, password) VALUES (?, ?, ?)`,
    [name, email, password]
  );

  return result;
}

async function updateClient(id, name, email) {
  const [result] = await pool.query(
    `UPDATE client SET name=?, email=? WHERE id = ?`,
    [name, email, id]
  );

  return result.insertId;
}

async function loginClient(email, password) {
  const [result] = await pool.query(
    `SELECT * FROM client WHERE email = ? AND password = ?`,
    [email, password]
  );

  return result;
}

export const clients = {
  getClients,
  getClient,
  createClient,
  updateClient,
  loginClient,
  getClientByPhone
};
