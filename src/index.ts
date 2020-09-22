import Koa from "koa";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";
import helmet from "koa-helmet";

import { unsecuredRouter } from "./routes/routes";
import { securedRouter } from "./routes/routes.secure";

/** Local imports **/
import { config } from "./config";

/** Start **/
const app = new Koa();

/** Middlewares **/
app.use(helmet());
app.use(json());
app.use(logger());
app.use(bodyParser());

/** Routes **/
// Unsecured routes
app.use(unsecuredRouter.routes()).use(unsecuredRouter.allowedMethods());

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: config.jwtSecret, key: "jwtdata" }));

// Secured routes
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

const PORT = config.port;
const server = app
  .listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });

export default server;
