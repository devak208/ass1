import React, { useState } from "react";

export const AddPostModal = ({ isOpen, onClose, onAddPost }) => {
  const [postContent, setPostContent] = useState("");
  const [media, setmedia] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setmedia(reader.result); // Store Base64-encoded image
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handlePost = () => {
    if (postContent.trim()) {
      onAddPost({ postContent, media });
      setPostContent("");
      setmedia("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Create a Post</h3>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-4 border rounded-lg shadow-sm mb-4"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-4 border rounded-lg shadow-sm mb-4"
        />
        {media && (
          <div className="mb-4">
            <img
              src={media}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handlePost}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Post
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
