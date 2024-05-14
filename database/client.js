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

async function getClientByPhone(phone) {
  const [rows] = await pool.query(`SELECT * FROM client WHERE phone = ?`, [
    phone,
  ]);
  return rows[0];
}

async function createClient(name, phone, password) {
  const [result] = await pool.query(
    `INSERT INTO client (name, phone, password) VALUES (?, ?, ?)`,
    [name, phone, password]
  );

  return result;
}

async function updateClient(id, name, phone) {
  const [result] = await pool.query(
    `UPDATE client SET name=?, phone=? WHERE id = ?`,
    [name, phone, id]
  );

  return result.insertId;
}

async function loginClient(phone, password) {
  const [result] = await pool.query(
    `SELECT * FROM client WHERE phone = ? AND password = ?`,
    [phone, password]
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
