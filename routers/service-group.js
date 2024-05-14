import express from "express";
import { database } from "../database/index.js";

export const serviceGroup = express.Router();

serviceGroup.get("", async (req, res) => {
  let serviceGroup = await database.serviceGroup.getServiceGroups();
  res.send({
    status: "ok",
    serviceGroup,
  });
});

serviceGroup.get("/:id", async (req, res) => {
  const id = req.params.id;
  const service = await database.serviceGroup.getServiceGroup(id);
  res.send(service);
});

serviceGroup.post("", async (req, res) => {
  const { name } = req.body;
  const service = await database.serviceGroup.createServiceGroup(name);
  res.status(201).send({
    status: "ok",
    service
  });
});

serviceGroup.put("", async (req, res) => {
  const { id_group, name } = req.body;
  const newClientId = await database.serviceGroup.updateServiceGroup(id_group, name);
  res.status(200).send({
    status: "ok",
    newClientId
  });
});
