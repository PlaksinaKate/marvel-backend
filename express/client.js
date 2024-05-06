import express from "express";
import { database } from "../database/index.js";

export const router = express.Router();

router.get('', async (req, res) => {
  const clientsRes = await database.clients.getClients();
  res.send(clientsRes);
});

router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const client = await database.clients.getClient(id);
  res.send(client);
});

router.post('', async (req, res) => {
  const { name, phone, password } = req.body;
  const newClientId = await database.clients.createClient(name, phone, password);
  res.status(201).send(newClientId);
});

router.put('', async (req, res) => {
  const { id, name, phone } = req.body;
  const newClientId = await database.clients.updateClient(id, name, phone);
  res.status(200).send(newClientId);
});