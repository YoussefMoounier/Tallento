const jwt = require("jsonwebtoken");
const User = require("../models/User");



const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};

module.exports = {  admin };