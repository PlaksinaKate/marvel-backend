import { pool } from "./pool.js";

async function getAllMasterWorkTime() {
  const [rows] = await pool.query("SELECT * FROM master_work_time");
  return rows;
}

async function getWorkTimeByMasterId(id) {
  const [rows] = await pool.query(
    `SELECT * FROM master_work_time WHERE master_id = ?`,
    [id]
  );
  return rows;
}

async function getWorkTimeByDate(date) {
  const [rows] = await pool.query(
    `SELECT * FROM master_work_time WHERE date = ?`,
    [date]
  );
  return rows;
}

async function getWorkTimeByDateTime(date, time) {
  const [rows] = await pool.query(
    `SELECT * FROM master_work_time WHERE date = ? AND time_interval = ?`,
    [date, time]
  );
  return rows;
}

async function createMasterWorkTime(date, time_interval, master_id) {
  const [result] = await pool.query(
    `INSERT INTO master_work_time (date, time_interval, master_id) VALUES (?, ?, ?)`,
    [date, time_interval, master_id]
  );

  return result.insertId;
}

async function updateMasterWorkTime(id, date, time_interval, master_id) {
  const [result] = await pool.query(
    `UPDATE master_work_time SET date=?, time_interval=?, master_id=? WHERE id = ?`,
    [date, time_interval, master_id, id]
  );
}

async function deleteMasterWorkTime(id) {
  const [result] = await pool.query(
    `DELETE FROM master_work_time WHERE id = ?`,
    [id]
  );
}

export const masterWorkTime = {
  getAllMasterWorkTime,
  getWorkTimeByMasterId,
  getWorkTimeByDate,
  getWorkTimeByDateTime,
  createMasterWorkTime,
  updateMasterWorkTime,
  deleteMasterWorkTime
};
