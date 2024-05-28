import express from "express";
import { database } from "../database/index.js";
import { unauthorized } from "./index.js";

export const service = express.Router();

service.get("", async (req, res) => {
  unauthorized(req, res);

  const { group, master } = req.query;
  let service;

  if (group) {
    service = await database.services.getServicesByServiceGroup(group);
  } else if (master) {
    service = await database.services.getServicesByMaster(master);
  } else {
    service = await database.services.getServices();
  }

  res.send({
    status: "ok",
    services: service,
  });
});

service.post("", async (req, res) => {
  unauthorized(req, res);

  const { name, id_group, price, id_master, description, time } = req.body;
  const service = await database.services.createService(
    name,
    id_group,
    price,
    id_master,
    description,
    time
  );
  res.status(201).send({
    status: "ok",
    service,
  });
});

service.put("", async (req, res) => {
  unauthorized(req, res);

  const { id, name, id_group, price, id_master, description, time } = req.body;
  const newClientId = await database.services.updateService(
    id,
    name,
    id_group,
    price,
    id_master,
    description,
    time
  );
  res.status(200).send({
    status: "ok",
    newClientId,
  });
});

service.delete("", async (req, res) => {
  unauthorized(req, res);

  const { id } = req.query;
  await database.services.deleteService(id);
  res.status(200).send({
    status: "ok",
  });
});
