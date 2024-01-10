import jwt from "jsonwebtoken";

const authorize = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach the user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export default authorize;
