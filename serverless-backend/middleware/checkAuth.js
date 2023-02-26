const db = require("../functions/db");

const checkAuth = async (req, res, next) => {
  if (req.headers?.authorization) {
    const token = req.headers?.authorization?.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const chk = await db.checkToken(token);
      console.log("chk", chk);
      if (chk) next();
      else return res.status(401).json({ message: "Unauthorized" });
    }
  } else return res.status(401).json({ message: "Unauthorized" });
};

module.exports = checkAuth;
