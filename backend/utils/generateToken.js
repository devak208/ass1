const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  try {
    // Generate the token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d", // Token expires in 15 days
    });

    // Check if running in production
    const isProduction = process.env.NODE_ENV === "production";

    // Set the token as a cookie
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true, // Prevent client-side access
      sameSite: isProduction ? "none" : "lax", // Cross-site support in production
      secure: isProduction, // HTTPS-only in production
    });

    console.log("JWT token generated and set as a cookie.");
  } catch (error) {
    console.error("Error generating token or setting cookie:", error);
    throw new Error("Failed to generate authentication token.");
  }
};

module.exports = generateTokenAndSetCookie;
