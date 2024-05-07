import { pool } from "./pool.js";

const loginAdmin = async (login, password) => {
  const [result] = await pool.query(
    `SELECT * FROM admin WHERE login = ? AND password = ?`,
    [login, password]
  );

  return result;
}

export const admin = {
  loginAdmin
}