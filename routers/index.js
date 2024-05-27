import { client } from "./client.js";
import { master } from "./master.js";
import { masterWorkTime } from "./master-work-time.js";
import { record } from "./record.js";
import { service } from "./service.js";
import { serviceGroup } from "./service-group.js";
import { login } from "./login.js";
import { registration } from "./registration.js";

export {
  client,
  master,
  masterWorkTime,
  record,
  service,
  serviceGroup,
  login,
  registration,
};

export const unauthorized = (req, res, next) => {
  if (!req.session.user == null) {
    res.status(401).send({ status: "error" });
  }
}
