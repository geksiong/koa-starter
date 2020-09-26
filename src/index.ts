import Koa from "koa";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";

/** Local imports **/
import { config } from "./config";
import demoApis from "./services/demo";

/** Start **/
const app = new Koa();

/** Middlewares **/
app.use(helmet());
app.use(json());
app.use(logger());
app.use(bodyParser());

/** APIs **/

// Demo APIs
const demoRouter = demoApis({
  prefix: "/demo",
  jwtSecret: config.jwtSecret,
});
app.use(demoRouter.routes()).use(demoRouter.allowedMethods());

const PORT = config.port;
const server = app
  .listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });

export default server;
