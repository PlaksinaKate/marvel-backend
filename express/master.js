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

master.post("", async (req, res) => {
  const { name, position, description, password } = req.body;
  const newMasterId = await database.masters.createMaster(
    name,
    position,
    description,
    password
  );
  res.status(201).send(newMasterId);
});