import React from "react";
import { usePostContext } from "../context/postcontext";
import { Header } from "../components/postcomponent/postheader";
import { PostsList } from "../components/postcomponent/postlist";

export const Home = () => {
  const { posts, loading } = usePostContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white"></div>
          <p className="text-lg font-semibold text-white animate-pulse">Fetching posts, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-white to-blue-100 min-h-screen pt-20"> {/* Added padding to account for fixed header */}
      {/* Fixed Header */}
      <Header />

      {/* Posts List */}
      <div className="container mx-auto px-4 py-8">
        <PostsList posts={posts} />
      </div>
    </div>
  );
};
