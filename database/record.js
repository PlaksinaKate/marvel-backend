import { database } from "./index.js";
import { pool } from "./pool.js";

async function getRecords() {
  const [rows] = await pool.query("SELECT * FROM record");
  return rows;
}

async function getRecord(id) {
  const [rows] = await pool.query(`SELECT * FROM record WHERE id_record = ?`, [
    id,
  ]);
  return rows[0];
}

async function getRecordByMasterId(masterId) {
  const [rows] = await pool.query(`SELECT * FROM record WHERE id_master = ?`, [
    masterId,
  ]);

  return rows
}

async function getRecordByClientId(clientId) {
  const [rows] = await pool.query(`SELECT * FROM record WHERE id_client = ?`, [
    clientId,
  ]);

  return rows;
}

async function createRecord(id_service, id_master, id_client, data_time, status) {
  const [result] = await pool.query(
    `INSERT INTO record (id_service, id_master, id_client, data_time, status) VALUES (?, ?, ?, ?, ?)`,
    [id_service, id_master, id_client, data_time, status]
  );

  return result.insertId;
}

async function updateRecord(id, id_service, id_master, id_client, data_time, status) {
  const [result] = await pool.query(
    `UPDATE record SET id_service=?, id_master=?, id_client=?, data_time=?, status=? WHERE id = ?`,
    [id_service, id_master, id_client, data_time, status, id]
  );

  return result.insertId;
}

async function deleteRecord(id) {
  const [result] = await pool.query(`DELETE FROM record WHERE id = ?`, [id]);

  return result.insertId;
}

export const records = {
  getRecords,
  getRecord,
  getRecordByMasterId,
  getRecordByClientId,
  createRecord,
  updateRecord,
  deleteRecord,
};
