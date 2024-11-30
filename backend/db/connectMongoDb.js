const mongoose = require('mongoose')

exports.connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL,)
        console.log("connected to mongoDb");
        
    } catch (error) {
        console.log("Error connecting to mongoDb" + error);

    }
}

