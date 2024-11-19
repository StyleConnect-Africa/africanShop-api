import jsonwebtoken from "jsonwebtoken";
import User from "../model/User.js";

const authMiddleware = (roles = []) => {
    if (typeof roles === "string") roles = [roles];
    return (req, res, next) => {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

      try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = { _id: decoded.userId, role: decoded.role };

        // Check if the user has one of the required roles
        if (roles.length && !roles.includes(decoded.role)) {
          return res.status(403).json({
            message: "You don't have permission to access this resource",
          });
        }
        next();
      } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "Invalid token" });
      }
    };
};
// Verify Vendor
export const verifyVendor = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Verify JWT token
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== "vendor") {
      return res.status(403).json({ message: "Forbidden: Vendor access only" });
    }

    req.user = user; // Add user info to the request for use in controllers
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
