import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getClients() {
  const [rows] = await pool.query("SELECT * FROM client");
  return rows;
}

export async function getClient(id) {
  const [rows] = await pool.query(`SELECT * FROM client WHERE id_client = ?`, [
    id,
  ]);
  return rows[0];
}

export async function createClient(name, phone) {
  const [result] = await pool.query(`INSERT INTO client (name, phone) VALUES (?, ?)`, [
    name,
    phone,
  ]);

  return result.insertId
}
