import express from "express";
import { database } from "../database/index.js";

export const login = express.Router();

login.post("", async (req, res) => {
  const { login, password } = req.body;
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

  if (result.length === 0) {
    result = await database.clients.loginClient(login, password);
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
    res.status(400).send({
      error: "Неверный логин или пароль",
    });
  }
});
