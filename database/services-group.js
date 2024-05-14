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

async function updateServiceGroup(id, name) {
  const [result] = await pool.query(
    `UPDATE service_group SET name=? WHERE id_group = ?`,
    [name, id]
  );

  return result.insertId;
}

async function deleteServiceGroup(id) {
  const [result] = await pool.query(
    `DELETE FROM service_group WHERE id_group = ?`,
    [id]
  );

  return result.insertId;
}

export const serviceGroup = {
  getServiceGroups,
  getServiceGroup,
  createServiceGroup,
  updateServiceGroup,
  deleteServiceGroup
};
