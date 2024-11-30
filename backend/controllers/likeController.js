const Post = require('../models/postModel');

exports.likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id; // Assuming `req.user` is populated by `protectRoute`

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            // Unlike the post
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            // Like the post
            post.likes.push(userId);
        }

        // Save the updated post
        await post.save();

        res.status(200).json({ likes: post.likes.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
