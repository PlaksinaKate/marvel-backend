import express from "express";
import { routers } from "./express/routers.js";
import { client, master, masterWorkTime, record, service, serviceGroup } from "./express/index.js";

const app = express();
app
  .use(express.json())
  .use(routers.client, client)
  .use(routers.master, master)
  .use(routers.masterWorkTime, masterWorkTime)
  .use(routers.record, record)
  .use(routers.service, service)
  .use(routers.serviceGroup, serviceGroup);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! ");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
