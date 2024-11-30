const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // `type` should be lowercase
        ref: "User", // Correct the `ref` to match the `User` model name
        required: true, // Fixed the typo in `require`
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, // `type` should be lowercase
        ref: "User", // Correct the `ref` to match the `User` model name
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
