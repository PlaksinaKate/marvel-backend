import express from "express";
import { database } from "../database/index.js";

export const master = express.Router();

master.get("", async (req, res) => {
  const masters = await database.masters.getMasters();
  res.send({
    status: "ok",
    masters,
  });
});

master.get("/:id", async (req, res) => {
  const id = req.params.id;
  const master = await database.masters.getMaster(id);
  res.send({
    status: "ok",
    master,
  });
});

master.post("", async (req, res) => {
  const { name, position, description, password, login } = req.body;
  await database.masters.createMaster(
    name,
    position,
    description,
    password,
    login
  );
  res.status(200).send({
    status: "ok",
  });
});

master.put("", async (req, res) => {
  const { id, name, position, description, login } = req.body;
  const master = await database.masters.updateMaster(
    id,
    name,
    position,
    description,
    login
  );
  res.status(200).send({
    status: "ok",
    master,
  });
});

master.delete("", async (req, res) => {
  const { id } = req.query;
  await database.masters.deleteMaster(id);
  res.status(200).send({
    status: "ok",
  });
});
