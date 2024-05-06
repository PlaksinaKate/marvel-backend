import express from "express";
import { database } from "../database/index.js";

export const client = express.Router();

client.get('', async (req, res) => {
  const clientsRes = await database.clients.getClients();
  res.send(clientsRes);
});

client.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const client = await database.clients.getClient(id);
  res.send(client);
});

client.post('', async (req, res) => {
  const { name, phone, password } = req.body;
  const newClientId = await database.clients.createClient(name, phone, password);
  res.status(201).send(newClientId);
});

client.put('', async (req, res) => {
  const { id, name, phone } = req.body;
  const newClientId = await database.clients.updateClient(id, name, phone);
  res.status(200).send(newClientId);
});