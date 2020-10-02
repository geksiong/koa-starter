import pino from "pino";
import koaPino from "koa-pino-logger";

const logger = pino({
  level: "info",
});

const koaLogger = koaPino({
  logger: logger,
});

// Log something on termination
const finalLog = (procEvent: string, exit: boolean = true) => {
  process.on(
    procEvent,
    pino.final(logger, (err, finalLogger) => {
      const msg = exit ? `Exited with ${err}` : `Received ${err}`;
      finalLogger.error(msg);
      if (exit) {
        process.exit(1);
      }
    })
  );
};

finalLog("SIGINT");
finalLog("uncaughtException");
finalLog("unhandledRejection");

export { logger, koaLogger };
