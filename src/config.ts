import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const isDevMode = process.env.NODE_ENV == "development";

const config = {
  port: process.env.PORT || 3000,
  debugLogging: isDevMode,
};

export { config };
