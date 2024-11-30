import React, { useEffect, useState } from "react";
import axios from "axios";

export const UserProfilePost = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/posts/user/${userId}`,
          { withCredentials: true }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600 font-medium">
        .....
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gradient-to-r text-black sm:mx-72 p-6 rounded-lg shadow-lg transform transition-all "
        >
          <h3 className="font-semibold text-xl text-black mb-4">{post.postContent}</h3>

          {/* Media (Image) Section */}
          {post.media && (
            <div className="flex justify-center">
              <div className="overflow-hidden rounded-lg mb-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
                <img
                  src={post.media}
                  alt="Post Media"
                  className="w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
