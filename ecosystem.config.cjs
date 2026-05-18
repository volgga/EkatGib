/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .reduce((env, line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith("#")) {
        return env;
      }

      const separatorIndex = trimmedLine.indexOf("=");

      if (separatorIndex === -1) {
        return env;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();

      if (key) {
        env[key] = value;
      }

      return env;
    }, {});
}

const productionEnv = readEnvFile("/var/www/shared/ekat-gib.env");
const runtimePort = 3001;
const runtimeHostname = "127.0.0.1";

module.exports = {
  apps: [
    {
      name: "ekat-gib",
      script: ".next/standalone/server.js",
      env: {
        ...productionEnv,
        NODE_ENV: "production",
        PORT: runtimePort,
        HOSTNAME: runtimeHostname,
      },
    },
  ],
};
