// PostsList.js
import React from "react";
import { Post } from "./post";


export const PostsList = ({ posts }) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};
