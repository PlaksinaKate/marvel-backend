import express from "express";
import { database } from "../database/index.js";
import { unauthorized } from "./index.js";

export const serviceGroup = express.Router();

serviceGroup.get("", async (req, res) => {
  unauthorized(req, res);

  let serviceGroup = await database.serviceGroup.getServiceGroups();
  res.send({
    status: "ok",
    serviceGroup,
  });
});

serviceGroup.get("/:id", async (req, res) => {
  unauthorized(req, res);

  const id = req.params.id;
  const service = await database.serviceGroup.getServiceGroup(id);
  res.send(service);
});

serviceGroup.post("", async (req, res) => {
  unauthorized(req, res);

  const { name } = req.body;
  const service = await database.serviceGroup.createServiceGroup(name);
  res.status(201).send({
    status: "ok",
    service,
  });
});

serviceGroup.put("", async (req, res) => {
  unauthorized(req, res);

  const { id, name } = req.body;
  const newClientId = await database.serviceGroup.updateServiceGroup(
    id,
    name
  );
  res.status(200).send({
    status: "ok",
    newClientId,
  });
});

serviceGroup.delete("", async (req, res) => {
  unauthorized(req, res);

  const { id } = req.query;
  const newClientId = await database.serviceGroup.deleteServiceGroup(id);
  res.status(200).send({
    status: "ok",
  });
});
