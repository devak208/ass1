const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true }, // User's full name
        username: { type: String, required: true, unique: true }, // Unique username
        email: { type: String, required: true, unique: true }, // Unique email
        password: { type: String, required: true, minlength: 6 }, // Password with minimum 6 characters
        gender: { type: String, required: true, enum: ["male", "female"] }, // Gender validation
        profilePic: { type: String, default: "" }, // URL or path for profile picture
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // References to followers
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // References to followed users
    },
    { timestamps: true } // Adds `createdAt` and `updatedAt` fields automatically
);

const User = mongoose.model("User", userSchema);

module.exports = User;
