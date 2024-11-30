const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { connectMongoDb } = require("./db/connectMongoDb");
const { initializeAbly, broadcast } = require("./ws/ably"); // Import Ably-related functions


// Import Routes
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");





// Initialize Express App
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const ably = initializeAbly();
// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://192.168.147.246:3000",  // Replace with the exact frontend URL
  credentials: true,
}));

// Connect to MongoDB
connectMongoDb();

// API Routes
app.use("/api/auth", authRoutes);             // Authentication
app.use("/api/messages", messageRoutes);      // Messages
app.use("/api/users", userRoutes);            // User Management
app.use("/api/posts", postRoutes);            // Posts, Comments, Likes

// Default Route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Social Media API!");
});

app.post("/broadcast", (req, res) => {
    const { channel, data } = req.body;
    broadcast(channel, data);  // Send broadcast message via Ably
    res.status(200).json({ message: "Message broadcasted successfully" });
  });

// Start the Server
server.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
