module.exports = {
  apps: [
    {
      name: "libretodo",
      script: "./index.js",
      env: {
        production: "yes",
      },
      error_file: "/opt/logs/error_log.txt",
      out_file: "/opt/logs/output_log.txt"
    },
  ],
};
