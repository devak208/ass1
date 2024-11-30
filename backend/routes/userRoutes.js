// routes/userRoutes.js
const express = require('express');
const protectRoute = require('../middleware/protectRoute');
const { getuserforSideBar, getUserProfile } = require('../controllers/userControler');
const { followUser } = require('../controllers/followController');

const router = express.Router();

// Route to get users for the sidebar (excluding logged-in user)
router.get("/", protectRoute, getuserforSideBar);

// Route to follow/unfollow a user
router.post("/:id/follow", protectRoute, followUser);

// Route to get a user's profile along with their posts
router.get("/profile/:userId", protectRoute, getUserProfile);

module.exports = router;
