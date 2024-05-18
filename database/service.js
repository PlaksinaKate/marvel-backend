import { pool } from "./pool.js";

async function getServices() {
  const [rows] = await pool.query("SELECT * FROM service");
  return rows;
}

async function getService(id) {
  const [rows] = await pool.query(`SELECT * FROM service WHERE id = ?`, [id]);
  return rows[0];
}

async function getServicesByServiceGroup(id) {
  const [rows] = await pool.query(`SELECT * FROM service WHERE id_group = ?`, [
    id,
  ]);
  return rows;
}

async function getServicesByMaster(id) {
  const [rows] = await pool.query(`SELECT * FROM service WHERE id_master = ?`, [
    id,
  ]);
  return rows[0];
}

async function createService(
  name,
  id_group,
  price,
  id_master,
  description,
  time
) {
  const [result] = await pool.query(
    `INSERT INTO service (name, id_group, price, id_master, description, time) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, id_group, price, id_master, description, time]
  );

  return result.insertId;
}

async function updateService(
  id,
  name,
  id_group,
  price,
  id_master,
  description,
  time
) {
  const [result] = await pool.query(
    `UPDATE service SET name=?, id_group=?, price=?, id_master=?, description=?, time=? WHERE id = ?`,
    [name, id_group, price, id_master, description, time, id]
  );

  return result.insertId;
}

async function deleteService(id) {
  const [result] = await pool.query(`DELETE FROM service WHERE id = ?`, [id]);
  return result.insertId;
}

export const services = {
  getServices,
  getService,
  getServicesByServiceGroup,
  getServicesByMaster,
  createService,
  updateService,
  deleteService,
};
