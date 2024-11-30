// controllers/userController.js
const User = require("../models/userModels");
const Post = require("../models/postModel");

exports.getuserforSideBar = async (req, res) => {
    try {
        console.log("Logged-in User:", req.user); // Debug log
        const logedInuserId = req.user._id;

        const filteredUser = await User.find({
            _id: { $ne: logedInuserId }, // Exclude the logged-in user
        });

        res.status(200).json(filteredUser);
    } catch (error) {
        console.error("Error in getuserforSideBar:", error); // Debug log
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('followers following');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch posts associated with the user
        const posts = await Post.find({ userId }).populate('userId').populate('comments');

        res.status(200).json({ user, posts }); // Return both user info and posts
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
