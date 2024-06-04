import express from "express";
import cors from "cors";
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
  registration,
  logout
} from "./routers/index.js";
import cron from 'node-cron'
import { sendMail, checkClientsRecord } from "./mail.js";

const store = new session.MemoryStore();

const app = express();
app.use(cors());
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 3000000 },
    resave: false,
    saveUninitialized: false,
    store
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
app.use(routers.logout, logout);

app.use((err, req, res, next) => {
  res.status(500).send({
    status: "error",
    message: err.message,
  });
  next();
});

cron.schedule('0 22 * * *', () => {
  console.log('running a task every minute');
 checkClientsRecord()
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
