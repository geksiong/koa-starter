/**
 * Unsecured routes
 * Do not define any routes here that are to be secured
 */
import Router from "koa-router";
import DemoController from "../controllers/demo.controller";

const router = new Router();

/** Routes **/
router.get("/demo", DemoController.hello);
router.post("/demo", DemoController.helloWithName);

export { router as unsecuredRouter };
