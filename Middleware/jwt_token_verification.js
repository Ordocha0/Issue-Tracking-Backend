import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      req.log.warn("No token provided");
      return res.status(401).json({ detail: 'You are not authenticated!' });
    }else{
      const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
      req.user = decoded;
      next();
    }

    

  } catch (error) {
    req.log.warn("Invalid token provided");
    return res.status(401).json({ detail: 'Invalid authentication token' });
  }
};