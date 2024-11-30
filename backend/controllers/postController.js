// controllers/postController.js
const Post = require('../models/postModel');
const User = require('../models/userModels');
const Comment = require('../models/commentModel'); // Ensure the comment model is imported

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { postContent, media } = req.body;
        const userId = req.user._id;

        const newPost = new Post({ userId, postContent, media });
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId').populate('comments');
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get posts by a specific user
exports.getPostsByUser = async (req, res) => {
    try {
        const { userId } = req.params;  // Get userId from URL parameters
        const posts = await Post.find({ userId }).populate('userId').populate('comments');
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
