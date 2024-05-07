import express from "express";
import { database } from "../database/index.js";

export const serviceGroup = express.Router();

serviceGroup.get("", async (req, res) => {
  let serviceGroup = await database.serviceGroup.getServiceGroups();
  res.send(serviceGroup);
});

serviceGroup.get("/:id", async (req, res) => {
  const id = req.params.id;
  const service = await database.serviceGroup.getServiceGroup(id);
  res.send(service);
});

serviceGroup.post("", async (req, res) => {
  const { name } = req.body;
  const service = await database.serviceGroup.createServiceGroup(name);
  res.status(201).send(service);
});

serviceGroup.put('', async (req, res) => {
  const { id, name } = req.body;
  const newClientId = await database.serviceGroup.updateServiceGroup(id, name);
  res.status(200).send(newClientId);
});