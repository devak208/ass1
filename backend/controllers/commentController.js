const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

exports.addComment = async (req, res) => {
    try {
        const { commentText } = req.body;
        const { postId } = req.params;
        const userId = req.user._id;

        const newComment = new Comment({ userId, postId, commentText });
        await newComment.save();

        const post = await Post.findById(postId);
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
