import Koa from "koa";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import serve from "koa-static";
import mount from "koa-mount";

/** Local imports **/
import { config } from "./config";
import { logger, koaLogger } from "./lib/logger";
import demoApis from "./services/demo";

/** Start **/
const app = new Koa();

/** Middlewares **/
app.use(helmet());
app.use(json());
app.use(koaLogger);
app.use(bodyParser());

/** Public folders **/
// Use koa-mount and koa-static to serve from "/public" route
// NOTE: It appears koa-static can't be used in nested routes
// so we can only serve from the root app
// TODO: copy these folders into build
app.use(mount("/public", serve(__dirname + "/public")));

/** APIs **/

// Demo APIs
const demoRouter = demoApis({
  prefix: "/demo",
  jwtSecret: config.jwtSecret,
});
app.use(demoRouter.routes()).use(demoRouter.allowedMethods());

const PORT = config.port;
const server = app
  .listen(PORT, () => {
    const mode = config.isDevMode ? "development" : "production";
    logger.info(`Server started in ${mode} mode. Listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });

export default server;
