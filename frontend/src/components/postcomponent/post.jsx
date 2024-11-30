import React, { useState } from "react";
import { FaThumbsUp, FaRegComment, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { usePostContext } from "../../context/postcontext";
import { useNavigate } from "react-router-dom";

export const Post = ({ post }) => {
  const { likePost, addComment } = usePostContext();
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    setIsLikeLoading(true);
    try {
      await likePost(post._id);
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    setIsCommentLoading(true);
    try {
      await addComment(post._id, commentText);
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleUsernameClick = () => {
    navigate(`/profile/${post.userId._id}`);
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xl mx-auto mb-8">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={post.userId?.profilePic || "/default-avatar.jpg"}
          alt="User Avatar"
          className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
        />
        <div>
          <button onClick={handleUsernameClick} className="text-lg font-semibold text-gray-800">
            {post.userId.username}
          </button>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {post.media && (
          <div className="overflow-hidden rounded-lg mb-4">
            <img
              src={post.media}
              alt="Post Media"
              className="w-full max-h-[400px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <p className="text-gray-800 text-sm">{post.postContent}</p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        {/* Like */}
        <button
          onClick={handleLike}
          disabled={isLikeLoading}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            Array.isArray(post.likes) && post.likes.includes(post.userId?._id)
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {isLikeLoading ? <FaSpinner className="animate-spin" size={20} /> : <FaThumbsUp size={20} />}
          <span className="font-medium">{post.likes?.length || 0}</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 transition"
        >
          <FaRegComment size={20} />
          <span className="font-medium">Comment</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-6 border-t pt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
              className="flex-grow border rounded-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCommentSubmit}
              disabled={isCommentLoading}
              className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition"
            >
              {isCommentLoading ? <FaSpinner className="animate-spin" size={20} /> : <FaPaperPlane size={20} />}
            </button>
          </div>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id} className="flex flex-col border-b pb-2">
                <p className="text-sm font-medium text-gray-800">{comment.userId?.username}</p>
                <p className="text-gray-600 text-sm">{comment.commentText}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};
