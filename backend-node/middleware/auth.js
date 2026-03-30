const jwt = require("jsonwebtoken");
const User = require("../models/user"); 

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Get token from header
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: fetch full user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach both decoded info and full user
    req.user = {
      id: decoded.id,
      role: decoded.role,
      data: user, // full user object
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;