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
  return rows[0];
}

async function getWorkTimeByDate(date) {
  const [rows] = await pool.query(
    `SELECT * FROM master_work_time WHERE date = ?`,
    [date]
  );
  return rows[0];
}

async function getWorkTimeByDateTime(date, time) {
  const [rows] = await pool.query(
    `SELECT * FROM master_work_time WHERE date = ? AND time_interval = ?`,
    [date, time]
  );
  return rows[0];
}

async function createMasterWorkTime(date, time_interval, master_id) {
  const [result] = await pool.query(
    `INSERT INTO master_work_time (date, time_interval, master_id) VALUES (?, ?, ?)`,
    [date, time_interval, master_id]
  );

  return result.insertId;
}

export const masterWorkTime = {
  getAllMasterWorkTime,
  getWorkTimeByMasterId,
  getWorkTimeByDate,
  getWorkTimeByDateTime,
  createMasterWorkTime,
};
