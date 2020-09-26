/**
 * Demo APIs
 */
import Router from "koa-router";
import jwt from "koa-jwt";
import DemoController from "./demo.controllers";

interface demoApiConfig {
  prefix: string;
  jwtSecret: string | Buffer;
}

const demoApis = (config: demoApiConfig): Router => {
  const apis = new Router({
    prefix: config.prefix,
  });

  /** Unsecured routes **/
  const router = new Router();
  router.get("/", DemoController.hello);
  router.post("/", DemoController.helloWithName);

  /** Secured routes **/
  const secureRouter = new Router();
  secureRouter.post("/secret", DemoController.helloWithSecret);

  /** Setup middlewares */
  apis.use(router.routes()).use(router.allowedMethods());
  apis.use(jwt({ secret: config.jwtSecret, key: "jwtdata" }));
  apis.use(secureRouter.routes()).use(secureRouter.allowedMethods());

  return apis;
};

export default demoApis;
