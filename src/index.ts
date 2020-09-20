import Koa from "koa";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";

import { unprotectedRouter } from "./routes.unprotected";
import { protectedRouter } from "./routes.protected";

/** Local imports **/
import { config } from "./config";

/** Start **/
const app = new Koa();

/** Middlewares **/
app.use(json());
app.use(logger());
app.use(bodyParser());

/** Routes **/
// unprotected routes
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: config.jwtSecret, key: "jwtdata" }));

// Protected routes
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

const PORT = config.port;
const server = app
  .listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });

export default server;
