import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

import { unprotectedRouter } from "./routes.unprotected";

/** Local imports **/
import { config } from "./config";

/** Start **/
const app = new Koa();

/** Middlewares **/
app.use(json());
app.use(logger());
app.use(bodyParser());

/** Routes **/
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

const PORT = config.port;
const server = app
  .listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });

export default server;
