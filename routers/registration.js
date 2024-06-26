import express from "express";
import { database } from "../database/index.js";

export const registration = express.Router();

registration.post("", async (req, res) => {
  const { login, name, position, description, email, password } = req.body;
  let result;
  let role;

  if (name && email && password) {
    result = await database.clients.getClientByPhone(email);

    if (result === undefined) {
      result = await database.clients.createClient(name, email, password);
      role = "client";
    } else {
      res.status(400).send({
        error: `Клиент с там e-mail уже существует`,
      });
      result = "";
    }
  }

  if (name && login && password && position && description) {
    result = await database.masters.getMasterByLogin(login);

    if (result.length === 0) {
      result = await database.masters.createMaster(
        name,
        position,
        description,
        password,
        login
      );
      role = "master";
    } else {
      res.status(400).send({
        error: `Maстер с таким login уже существует`,
      });
      result = "";
    }
  }

  if (result) {
    res.send({
      status: "ok",
      role,
    });
  }
});
