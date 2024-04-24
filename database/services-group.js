import { pool } from "./pool.js";

async function getServiceGroups() {
  const [rows] = await pool.query("SELECT * FROM service_group");
  return rows;
}

async function getServiceGroup(id) {
  const [rows] = await pool.query(
    `SELECT * FROM service_group WHERE id_group = ?`,
    [id]
  );
  return rows[0];
}

async function createServiceGroup(name) {
  const [result] = await pool.query(
    `INSERT INTO service_group (name) VALUES (?)`,
    [name]
  );

  return result.insertId;
}

export const serviceGroup = {
  getServiceGroups,
  getServiceGroup,
  createServiceGroup,
};
