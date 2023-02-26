const crypto = require("crypto");
const generateToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const now = new Date().getTime();
  const texp = now + 30 * 24 * 3600 * 1000;
  return [token, texp];
};

module.exports = generateToken;
