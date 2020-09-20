import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env" });

const isDevMode = process.env.NODE_ENV == "development";

/**
 * JWT secret
 * - If public key file is found, it will be used for JWT verification
 * - Otherwise shared secret will be taken from .env
 * - Do not copy key files to the build. Generate your own.
 */

// you can either use a shared key from .env, or provide a
// note that this file will not be copied to the final build
const jwtKeyFile = process.env.JWT_KEYFILE;
let jwtPubKeyFromFile;
try {
  jwtPubKeyFromFile = fs.readFileSync(jwtKeyFile + ".pub");
  console.log("JWT key file found");
} catch (err) {
  console.log("JWT key file not found, using shared key");
}

const config = {
  port: process.env.PORT || 3000,
  debugLogging: isDevMode,
  jwtSecret: jwtPubKeyFromFile || process.env.JWT_SECRET,
};

export { config };
