import express from "express";
import { database } from "../database/index.js";
import { unauthorized } from "./index.js";

export const record = express.Router();

record.get("", async (req, res) => {
  unauthorized(req, res);

  const { client, master } = req.query;
  let records;

  if (client) {
    records = await database.records.getRecordByClientId(client);
  } else if (master) {
    records = await database.records.getRecordByMasterId(master);
  } else {
    records = await database.records.getRecords();
  }

  res.send({
    status: "ok",
    records,
  });
});

record.post("", async (req, res) => {
  unauthorized(req, res);

  const { id_service, id_master, id_client, data_time } = req.body;
  const records = await database.records.createRecord(
    id_service,
    id_master,
    id_client,
    data_time
  );
  res.status(201).send({
    status: "ok",
    records,
  });
});

record.put("", async (req, res) => {
  unauthorized(req, res);

  const { id, id_service, id_master, id_client, data_time } = req.body;
  await database.records.updateRecord(
    id,
    id_service,
    id_master,
    id_client,
    data_time
  );
  res.status(200).send({
    status: "ok",
  });
});

record.delete("", async (req, res) => {
  unauthorized(req, res);

  const { id } = req.query;
  const newClientId = await database.records.deleteRecord(id);
  res.status(200).send({
    status: "ok",
  });
});
