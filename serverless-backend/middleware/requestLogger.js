const tslog = require("../functions/timeStampedLog");

module.exports = (req, _, next) =>
  tslog(`Received ${req.method} request from ${req.ip} - ${req.path}`) || next();
