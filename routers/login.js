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

  console.log('result', result[0])

  if (result.length > 0) {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      req.session.authenticated = true;

      req.session.user = {
        id: result[0].id,
        role: role,
      };

      res.json(req.session);

      res.send({
        status: "ok",
        role,
        user: role !== "admin" && result[0],
      });
    }
  } else {
    res.status(400).send({
      error: "Неверный логин или пароль",
    });
  }
});
