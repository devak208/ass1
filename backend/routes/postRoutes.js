// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts, getPostsByUser } = require('../controllers/postController');
const protectRoute = require('../middleware/protectRoute');
const { addComment } = require('../controllers/commentController');
const { likePost } = require('../controllers/likeController');

const router = express.Router();

// Route to create a new post
router.post('/create', protectRoute, createPost); 

// Route to get all posts
router.get('/all', protectRoute, getPosts);

// Route to add a comment on a post
router.post('/:postId/comment', protectRoute, addComment);

// Route to like a post
router.post('/:postId/like', protectRoute, likePost);

// Route to get posts by a specific user
router.get('/user/:userId', protectRoute, getPostsByUser);

module.exports = router;
