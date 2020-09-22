/**
 * Secured routes
 * Define secured routes here separately from the unsecured routes,
 * as the appropriate Koa middleware will need to be inserted before them.
 */
import Router from "koa-router";
import DemoController from "../controllers/demo.controller";

const router = new Router();

/** Routes **/

// Demo routes
router.post("/demo/secret", DemoController.helloWithSecret);

export { router as securedRouter };
