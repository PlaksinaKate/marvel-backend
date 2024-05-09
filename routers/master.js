import express from "express";
import { database } from "../database/index.js";

export const master = express.Router();

master.get("", async (req, res) => {
  const mastersRes = await database.masters.getMasters();
  res.send(mastersRes);
});

master.get("/:id", async (req, res) => {
  const id = req.params.id;
  const master = await database.masters.getMaster(id);
  res.send(master);
});

master.put('', async (req, res) => {
  const { id, name, position, description } = req.body;
  const master = await database.masters.updateMaster(id, name, position, description);
  res.status(200).send(master);
});