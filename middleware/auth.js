require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.jwtsecret;

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");
  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token authorization denied" });
  }
  // Verify Token
  try {
    const decoded = jwt.verify(token, jwtsecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not found" });
  }
};
