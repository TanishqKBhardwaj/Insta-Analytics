// middleware/auth.js
import jwt from "jsonwebtoken";
import "dotenv/config"

export const authenticate = (req, res, next) => {
  const token = req.cookies?.jwt; 
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
