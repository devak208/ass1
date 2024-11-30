import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./authcontext";

// Create PostContext
const PostContext = createContext();

// Custom hook to access PostContext
export const usePostContext = () => {
  return useContext(PostContext);
};

// PostProvider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authuser } = useAuthContext();

  // Fetch all posts when authuser is available
  useEffect(() => {
    if (authuser) {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/posts/all`,
            { withCredentials: true }
          );
          setPosts(response.data); // Set the posts data from the API
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [authuser]); // Add authuser to dependency array

  // Like a post
  const likePost = async (postId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}/like`,
        {},
        { withCredentials: true }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: response.data.likes } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Add a comment to a post
  const addComment = async (postId, commentText) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}/comment`,
        { commentText },
        { withCredentials: true }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        likePost,
        addComment,
        setPosts, // Expose setPosts for external updates
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
