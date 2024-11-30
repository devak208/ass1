const mongoose = require('mongoose');

exports.connectMongoDb = async () => {
    try {
        // Establish connection with recommended options
        await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Ensures a stable connection pool
            
            
        });

        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);

        // Optional: Exit process if database connection fails
        process.exit(1);
    }
};
