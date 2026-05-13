module.exports = {
  apps: [
    {
      name: "ekat-gib",
      script: ".next/standalone/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
