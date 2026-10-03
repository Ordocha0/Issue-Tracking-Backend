import jwt from "jsonwebtoken";

const generateJWTToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email ,role: user.role }, // payload
    process.env.JWT_SECRET,            // secret key
    { expiresIn: "4h" }                // optional
  );
};

const verifyJWTToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Format: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};


export { generateJWTToken, verifyJWTToken };