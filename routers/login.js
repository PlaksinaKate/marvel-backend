import express from "express";
import { database } from "../database/index.js";

export const login = express.Router();

login.post("/admin", async (req, res) => {
  const { login, password } = req.body;
  const result = await database.admin.loginAdmin(login, password);

  if (result.length > 0) {
    res.send({
      status: "ok",
    });
  } else {
    res.status(400).send("Неверный логин или пароль");
  }
});

login.post("/client", async (req, res) => {
  const { phone, password } = req.body;
  const result = await database.clients.loginClient(phone, password);

  if (result.length > 0) {
    res.send({
      status: "ok",
    });
  } else {
    res.status(400).send("Неверный номер или пароль");
  }
});

login.post("/master", async (req, res) => {
  const { login, password } = req.body;
  const result = await database.masters.loginMaster(login, password);

  if (result.length > 0) {
    res.send({
      status: "ok",
    });
  } else {
    res.status(400).send("Неверный номер или пароль");
  }
});
