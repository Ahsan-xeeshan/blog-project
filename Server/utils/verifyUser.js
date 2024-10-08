const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Extract the token from the cookies
  const token = req.cookies?.access_token; // Optional chaining to avoid errors

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = { verifyToken };
