import express from "express";
import { database } from "../database/index.js";

export const masterWorkTime = express.Router();

masterWorkTime.get("", async (req, res) => {
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

masterWorkTime.get("/:id", async (req, res) => {
  const id = req.params.id;
  const workTime = await database.masterWorkTime.getWorkTimeByMasterId(id);
  res.send(workTime);
});

masterWorkTime.post("", async (req, res) => {
  const { date, time_interval, master_id } = req.body;
  const newMasterWorkTimeId =
    await database.masterWorkTime.createMasterWorkTime(
      date,
      time_interval,
      master_id
    );
  res.status(201).send(newMasterWorkTimeId);
});