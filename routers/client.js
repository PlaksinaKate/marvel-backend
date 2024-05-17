import express from "express";
import { database } from "../database/index.js";

export const client = express.Router();

client.get("", async (req, res) => {
  const clients = await database.clients.getClients();
  res.send({ status: "ok", clients });
});

client.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const client = await database.clients.getClient(id);
  res.send(client);
});

client.put("", async (req, res) => {
  const { id, name, phone } = req.body;
  await database.clients.updateClient(id, name, phone);
  res.status(200).send({ status: "ok" });
});
