const jwt = require("jsonwebtoken");
const User = require("../models/User");

const admin = async (req, res, next) => {
 
    try {

      const user = await User.findById(decoded.id).select("-password");

      if (user && user.isAdmin) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Not authorized as an admin" });
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  
  
};

module.exports = { admin };