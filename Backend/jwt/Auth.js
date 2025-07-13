import jwt from "jsonwebtoken";

const UserAuth = async (req, res, next) => {
  try {
    // Extract token from 'Authorization' header: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // now use req.userId instead of req.body.userId

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export { UserAuth };
