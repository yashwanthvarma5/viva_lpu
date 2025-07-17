const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function protect(req, res, next) {
  const token = req.headersauthorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });
  try {
    const decoded = jwt.verify(token, process.env.jwt_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
}

module.exports = { protect };
