/**
 * Demo APIs
 */
import Router from "koa-router";
import { DefaultState, Context } from "koa";
import DemoController from "./demo.controllers";
import passport from "koa-passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

/**
 * Note regarding koa-router
 * Due to type definition conflicts between koa-router and some koa middleware (e.g. koa-passport),
 * initialize the Routers with `new Router<DefaultState, Context>()`
 *
 * More info at https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161
 */
interface demoApiConfig {
  prefix: string;
  jwtSecret: string | Buffer;
}

const demoApis = (config: demoApiConfig): Router => {
  const apis = new Router({
    prefix: config.prefix,
  });

  /** Unsecured routes **/
  const router = new Router<DefaultState, Context>();
  router.get("/", DemoController.hello);
  router.post("/", DemoController.helloWithName);

  /** Secured routes **/
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret,
        // You should specify the algorithm, and perhaps the issuer as well
        // Algorithm is omitted in this demo to try out different algorithms easily
      },
      async (jwt_payload, done) => {
        done(null, jwt_payload.name);
      }
    )
  );

  const secureRouter = new Router<DefaultState, Context>();
  secureRouter.post(
    "/secret",
    passport.authenticate("jwt", { session: false }),
    DemoController.helloWithSecret
  );

  /** Setup middlewares */
  apis.use(passport.initialize());
  apis.use(router.routes()).use(router.allowedMethods());
  apis.use(secureRouter.routes()).use(secureRouter.allowedMethods());

  return apis;
};

export default demoApis;
