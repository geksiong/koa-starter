import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

/** Local imports **/
import { config } from "./config";

/** Start **/
const app = new Koa();
const router = new Router();

const PORT = config.port;

/** Middlewares **/
app.use(json());
app.use(logger());
app.use(bodyParser());

/** Routes **/
app.use(router.routes()).use(router.allowedMethods());

router.get("/", async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = { message: "This is your GET route" };

  await next();
});

router.post("/data", async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = {
    message: "This is your POST route, attached you can find the data you sent",
    body: ctx.request.body,
  };
  await next();
});

const server = app
  .listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });

export default server;
