const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5-second timeout
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.stack || error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
