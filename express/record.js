import express from "express";
import { database } from "../database/index.js";

export const record = express.Router();

record.get("", async (req, res) => {
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

record.get("/:id", async (req, res) => {
  const id = req.params.id;
  const record = await database.records.getRecord(id);
  res.send(record);
});

record.post("", async (req, res) => {
  const { id_service, id_master, id_client, data_time } = req.body;
  const record = await database.records.createRecord(
    id_service,
    id_master,
    id_client,
    data_time
  );
  res.status(201).send(record);
});

record.put("", async (req, res) => {
  const { id, id_master, date_time } = req.body;
  const newClientId = await database.records.updateRecord(id, id_master, date_time);
  res.status(200).send(newClientId);
});
