const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Not authorized, no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({ error: "Invalid token payload" });
        }

        console.log("Decoded token:", decoded);  // Debugging log

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = { _id: user._id }; // Attach user ID to req.user
        next();
    } catch (error) {
        console.error("Authorization error:", error);
        res.status(401).json({ error: "Not authorized" });
    }
};


module.exports = protectRoute;
