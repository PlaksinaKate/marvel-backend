import express from "express";
import { database } from "../database/index.js";

export const login = express.Router();

login.post("", async (req, res) => {
  const { login, phone, password } = req.body;
  let result;
  let role;

  if (login && password) {
    result = await database.admin.loginAdmin(login, password);
    role = "admin";
    req.session.admin = login;
  }

  if (result.length === 0) {
    result = await database.masters.loginMaster(login, password);
    role = "master";
    req.session.master = login;
  }

  if (phone && password) {
    result = await database.clients.loginClient(phone, password);
    role = "client";
    req.session.client = login;
  }

  if (result.length > 0) {
    req.session.loggedin = true;

    res.send({
      status: "ok",
      role,
    });
  } else {
    res.status(400).send("Неверный логин или пароль");
  }
});
