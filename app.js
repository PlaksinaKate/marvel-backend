import express from "express";
import cors from 'cors';
import session from "express-session";
import { routers } from "./routers/routers.js";
import {
  client,
  master,
  masterWorkTime,
  record,
  service,
  serviceGroup,
  login,
  registration
} from "./routers/index.js";

const app = express();
app.use(cors())
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routers.client, client);
app.use(routers.master, master);
app.use(routers.masterWorkTime, masterWorkTime);
app.use(routers.record, record);
app.use(routers.service, service);
app.use(routers.serviceGroup, serviceGroup);
app.use(routers.registration, registration);
app.use(routers.login, login);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
      status: "error",
      message: err.message
  });
  next();
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
