import express from "express";
import { database } from "../database/index.js";
import { unauthorized } from "./index.js";

export const masterWorkTime = express.Router();

masterWorkTime.get("", async (req, res) => {
  unauthorized(req, res);

  const { date, time } = req.query;
  let workTime;
  if (date && time) {
    workTime = await database.masterWorkTime.getWorkTimeByDateTime(date, time);
  } else if (date) {
    workTime = await database.masterWorkTime.getWorkTimeByDate(date);
  } else {
    workTime = await database.masterWorkTime.getAllMasterWorkTime();
  }
  res.send({
    status: "ok",
    workTime,
  });
});

masterWorkTime.get("/:id", async (req, res) => {
  unauthorized(req, res);
  
  const id = req.params.id;
  const workTime = await database.masterWorkTime.getWorkTimeByMasterId(id);
  res.status(200).send({
    status: "ok",
    workTime,
  });
});

masterWorkTime.post("", async (req, res) => {
  unauthorized(req, res);

  const { date, time_interval, master_id } = req.body;
  const newMasterWorkTimeId =
    await database.masterWorkTime.createMasterWorkTime(
      date,
      time_interval,
      master_id
    );
  res.status(201).send({
    status: "ok",
    newMasterWorkTimeId,
  });
});

masterWorkTime.put("", async (req, res) => {
  unauthorized(req, res);

  const { id, date, time_interval, master_id } = req.body;
  const newMasterWorkTimeId =
    await database.masterWorkTime.updateMasterWorkTime(
      id,
      date,
      time_interval,
      master_id
    );
  res.status(201).send({
    status: "ok",
    newMasterWorkTimeId,
  });
});

masterWorkTime.delete("", async (req, res) => {
  unauthorized(req, res);

  const { id } = req.query;
  await database.masterWorkTime.deleteMasterWorkTime(id);
  res.status(201).send({
    status: "ok",
  });
});
