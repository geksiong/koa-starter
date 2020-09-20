/**
 * Routes that are protected
 */
import Router from "koa-router";
import DemoController from "./controllers.demo";

const protectedRouter = new Router();

/** Routes **/
protectedRouter.post("/demo/secret", DemoController.helloWithSecret);

export { protectedRouter };
