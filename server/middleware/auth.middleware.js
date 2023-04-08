import jwt from "jsonwebtoken";
import config from "config";

export default (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Auth error" });

    const decoded = jwt.verify(token, config.get("sekretKey"));
    req.user = decoded;
  
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth error" });
  }
};
