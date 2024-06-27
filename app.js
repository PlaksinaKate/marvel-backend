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
import { checkClientsRecord } from "./mail.js";

const store = new session.MemoryStore();

const app = express();
// app.use((rs,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
//   });

app.use(cors());
app.options('*' , cors());

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

cron.schedule('0 13 * * *', () => {
 checkClientsRecord()
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
