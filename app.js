import express from "express";
import { database } from "./database/index.js";
import { routers } from "./express/routers.js";
import { client, master, masterWorkTime, record, service } from "./express/index.js";

const app = express();
app
  .use(express.json())
  .use(routers.client, client)
  .use(routers.master, master)
  .use(routers.masterWorkTime, masterWorkTime)
  .use(routers.record, record)
  .use(routers.service, service);

app.get("/service-group", async (req, res) => {
  let serviceGroup = await database.serviceGroup.getServiceGroups();
  res.send(serviceGroup);
});

app.get("/service-group/:id", async (req, res) => {
  const id = req.params.id;
  const service = await database.serviceGroup.getServiceGroup(id);
  res.send(service);
});

app.post("/service-group", async (req, res) => {
  const { name } = req.body;
  const service = await database.serviceGroup.createServiceGroup(name);
  res.status(201).send(service);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! ");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
