const jwt = require("jsonwebtoken");
const config = require("../config/key");

function isAuth(req, res, next) {
    
  const token = req.header('authorization')?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = isAuth;