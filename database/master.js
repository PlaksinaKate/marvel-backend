import { pool } from "./pool.js";

async function getMasters() {
  const [rows] = await pool.query("SELECT * FROM master");
  return rows;
}

async function getMaster(id) {
  const [rows] = await pool.query(`SELECT * FROM master WHERE id = ?`, [
    id,
  ]);
  return rows[0];
}

async function getMasterByLogin(login) {
  const [rows] = await pool.query(`SELECT * FROM master WHERE login = ?`, [
    login,
  ]);
  return rows[0];
}

async function createMaster(name, position, description, password, login) {
  const [result] = await pool.query(
    `INSERT INTO master (name, position, description, password, login) VALUES (?, ?, ?, ?, ?)`,
    [name, position, description, password, login]
  );

  return result;
}

async function updateMaster(id, name, position, description, login) {
  const [result] = await pool.query(
    `UPDATE master SET name=?, position=?, description=?, login = ? WHERE id = ?`,
    [name, position, description, login, id]
  );

  return result.insertId;
}

async function deleteMaster(id) {
  const [result] = await pool.query(
    `DELETE FROM master WHERE id_master = ?`,
    [id]
  );

  return result.insertId;
}

const loginMaster = async (login, password) => {
  const [result] = await pool.query(
    `SELECT * FROM master WHERE login = ? AND password = ?`,
    [login, password]
  );

  return result;
};

export const masters = {
  getMasters,
  getMaster,
  createMaster,
  updateMaster,
  loginMaster,
  getMasterByLogin,
  deleteMaster
};
