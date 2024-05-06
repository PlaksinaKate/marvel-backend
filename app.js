import express from "express";
import { database } from "./database/index.js";
import { router as client } from "./express/client.js";
import { routers } from "./express/routers.js";

const app = express();
app.use(express.json()).use(routers.client, client);

app.get("/master", async (req, res) => {
  const mastersRes = await database.masters.getMasters();
  res.send(mastersRes);
});

app.get("/master/:id", async (req, res) => {
  const id = req.params.id;
  const master = await database.masters.getMaster(id);
  res.send(master);
});

app.post("/master", async (req, res) => {
  const { name, position, description, password } = req.body;
  const newMasterId = await database.masters.createMaster(
    name,
    position,
    description,
    password
  );
  res.status(201).send(newMasterId);
});

app.get("/master-work-time", async (req, res) => {
  const { date, time } = req.query;
  let workTime;
  if (date && time) {
    workTime = await database.masterWorkTime.getWorkTimeByDateTime(date, time);
  } else if (date) {
    workTime = await database.masterWorkTime.getWorkTimeByDate(date);
  } else {
    workTime = await database.masterWorkTime.getAllMasterWorkTime();
  }
  res.send(workTime);
});

app.get("/master-work-time/:id", async (req, res) => {
  const id = req.params.id;
  const workTime = await database.masterWorkTime.getWorkTimeByMasterId(id);
  res.send(workTime);
});

app.post("/master-work-time", async (req, res) => {
  const { date, time_interval, master_id } = req.body;
  const newMasterWorkTimeId =
    await database.masterWorkTime.createMasterWorkTime(
      date,
      time_interval,
      master_id
    );
  res.status(201).send(newMasterWorkTimeId);
});

app.get("/record", async (req, res) => {
  const { client, master } = req.query;
  let record;

  if (client) {
    record = await database.records.getRecordByClientId(client);
  } else if (master) {
    record = await database.records.getRecordByMasterId(master);
  } else {
    record = await database.records.getRecords();
  }

  res.send(record);
});

app.get("/record/:id", async (req, res) => {
  const id = req.params.id;
  const record = await database.records.getRecord(id);
  res.send(record);
});

app.post("/record", async (req, res) => {
  const { id_service, id_master, id_client, data_time } = req.body;
  const record = await database.records.createRecord(
    id_service,
    id_master,
    id_client,
    data_time
  );
  res.status(201).send(record);
});

app.get("/service", async (req, res) => {
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

app.get("/service/:id", async (req, res) => {
  const id = req.params.id;
  const service = await database.services.getService(id);
  res.send(service);
});

app.post("/service", async (req, res) => {
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
