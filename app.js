import express from "express";
import { database } from "./database/index.js";

const app = express();
app.use(express.json())

app.get("/client", async (req, res) => {
  const clientsRes = await database.clients.getClients();
  res.send(clientsRes)
});

app.get("/client/:id", async (req, res) => {
  const id = req.params.id;
  const client = await database.clients.getClient(id);
  res.send(client)
});

app.post("/client", async(req, res) => {
  const {name, phone} = req.body;
  const newClientId = await database.clients.createClient(name, phone);
  res.status(201).send(newClientId)
});

app.get("/master", async (req, res) => {
  const mastersRes = await database.masters.getMasters();
  res.send(mastersRes)
});

app.get("/master/:id", async (req, res) => {
  const id = req.params.id;
  const master = await database.masters.getMaster(id);
  res.send(master)
});

app.post("/master", async(req, res) => {
  const {name, position, description} = req.body;
  const newMasterId = await database.masters.createMaster(name, position, description);
  res.status(201).send(newMasterId)
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! ");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
