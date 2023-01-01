const User = require("../model/User");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    token = token.split(" ")[1];
    const tokenDecoded = jwt.verify(token, "secret-key");
    if (!tokenDecoded) {
      res.status(401).json({ message: "Invalid Token" });
    }

    const checkInDatabase = await User.findById(tokenDecoded._id);
    if (!checkInDatabase) {
      res.status(401).json({ message: "Unauthorized" });
    }

    req.user = checkInDatabase;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
