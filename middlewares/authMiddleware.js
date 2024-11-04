import jsonwebtoken from "jsonwebtoken";

const authMiddleware = (roles = []) => {
  if (typeof roles === "string") roles = [roles];
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).send("Access Denied");

    try {
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if the user has one of the required roles
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "You don't have permission to access this resource",
        });
      }
      next();
    } catch (error) {
      res.status(400).send("Invalid Token");
    }
  };
};

export default authMiddleware;
