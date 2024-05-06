import express from "express";
import { database } from "../database/index.js";

export const service = express.Router();

service.get("", async (req, res) => {
  const { group, master } = req.query;
  let service;

  if (group) {
    service = await database.services.getServicesByServiceGroup(group);
  } else if (master) {
    service = await database.services.getServicesByMaster(master);
  } else {
    service = await database.services.getServices();
  }

  res.send(service);
});

service.get("/:id", async (req, res) => {
  const id = req.params.id;
  const service = await database.services.getService(id);
  res.send(service);
});

service.post("", async (req, res) => {
  const { name, id_group, price, id_master, description, time } = req.body;
  const service = await database.services.createService(
    name,
    id_group,
    price,
    id_master,
    description,
    time
  );
  res.status(201).send(service);
});

service.put('', async (req, res) => {
  const { id, name, price, description } = req.body;
  const newClientId = await database.services.updateService(id, name, price, description);
  res.status(200).send(newClientId);
});