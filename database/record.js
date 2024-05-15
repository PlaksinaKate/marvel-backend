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

  const { id_record, id_service, id_client, data_time } = rows[0];
  const client = await database.clients.getClient(id_client);
  const service = await database.services.getService(id_service);

  return {
    id_record,
    service,
    client,
    data_time,
  };
}

async function getRecordByClientId(clientId) {
  const [rows] = await pool.query(`SELECT * FROM record WHERE id_client = ?`, [
    clientId,
  ]);

  const { id_record, id_service, id_master, data_time } = rows[0];
  const master = await database.masters.getMaster(id_master);
  const service = await database.services.getService(id_service);

  return {
    id_record,
    service,
    master,
    data_time,
  };
}

async function createRecord(id_service, id_master, id_client, data_time) {
  const [result] = await pool.query(
    `INSERT INTO record (id_service, id_master, id_client, data_time) VALUES (?, ?, ?, ?)`,
    [id_service, id_master, id_client, data_time]
  );

  return result.insertId;
}

async function updateRecord(id, id_service, id_master, id_client, data_time) {
  const [result] = await pool.query(
    `UPDATE record SET id_service=?, id_master=?, id_client=?, data_time=? WHERE id = ?`,
    [id_service, id_master, id_client, data_time, id]
  );

  return result.insertId;
}

export const records = {
  getRecords,
  getRecord,
  getRecordByMasterId,
  getRecordByClientId,
  createRecord,
  updateRecord,
};
