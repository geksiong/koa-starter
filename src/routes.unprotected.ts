/**
 * Routes that are unprotected
 */
import Router from "koa-router";
import DemoController from "./controllers.demo";

const unprotectedRouter = new Router();

/** Routes **/
unprotectedRouter.get("/demo", DemoController.hello);
unprotectedRouter.post("/demo", DemoController.helloWithName);

export { unprotectedRouter };
