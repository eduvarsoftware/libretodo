const optionsHandler = (req, res, next) => {
  if (req.method.toLowerCase() === "options")
    return res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(405)
      .send("HTTP 405 Method Not Allowed");
  else return next();
};

module.exports = optionsHandler;
