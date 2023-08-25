const JWT = require("jsonwebtoken")

// this is auth middleware file

// We protect the routes on the bases of authorization
// middleware is used for authintication here we get the token and match it with login token if it got matched then we route the user at specific pages 

const authMiddleware = (req, res, next) => {
    try {
      // suppose we have token like "Bearer lkjhdf434lkejf4sld4"
      // below .split(" ")[1] ignoor the Bearer naming convention also space and then start token from index 1  
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from req headers Authorization
      if (!token) {
        return res.status(401).json({ message: "Missing token", success: false });
      }
  
      const decoded = JWT.verify(token, process.env.JWT_TOKEN); // Verify the token
  
      // Attach user ID to the request object for further use
      req.body.userId = decoded.id;
      
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Auth failed", success: false });
    }
  };
  
  module.exports = authMiddleware;