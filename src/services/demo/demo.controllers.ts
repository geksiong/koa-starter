/**
 * Demo Controllers
 */

import { Context } from "koa";
import DemoServices from "./demo.services";

export default class DemoController {
  public static async hello(ctx: Context): Promise<void> {
    ctx.body = { message: DemoServices.hello() };
  }

  public static async helloWithName(ctx: Context): Promise<void> {
    const name = ctx.request.body?.name || "NONAME";
    ctx.body = { message: DemoServices.helloWithName(name) };
  }

  public static async helloWithSecret(ctx: Context): Promise<void> {
    const secretMsg = ctx.request.body?.secretMsg || "";
    ctx.body = {
      message: DemoServices.helloWithSecret(ctx.state.user, secretMsg),
    };
  }
}
