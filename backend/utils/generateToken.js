const jwt = require("jsonwebtoken");


const generateTokenAndSetCookie = (userId, res) => {
    try {
        // Generate the token
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15d", // Token expires in 15 days
        });

        // Set the token as a cookie
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "lax", // Relaxed policy for development
            secure: false, // Allow HTTP in development
        });
        

        console.log("JWT token generated and set as a cookie.");
    } catch (error) {
        console.error("Error generating token or setting cookie:", error);
        throw new Error("Failed to generate authentication token.");
    }
};

module.exports = generateTokenAndSetCookie;
