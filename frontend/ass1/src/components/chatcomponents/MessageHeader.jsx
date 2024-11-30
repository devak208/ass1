import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import useConversation from "../../zustand/useConversation";

export const MessageHeader = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const navigate = useNavigate(); // Initialize the navigate hook

  if (!selectedConversation) {
    return null; // If no conversation is selected, show nothing
  }

  const handleProfileClick = () => {
    // Navigate to the user's profile page
    navigate(`/profile/${selectedConversation.userId}`);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg ">
      {/* Back Button */}
      <button
        onClick={() => setSelectedConversation(null)} // Clear selected conversation
        className="p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Profile Details */}
      <div className="flex items-center gap-3">
        <img
          src={selectedConversation.profilePic}
          alt={selectedConversation.fullname}
          className="w-12 h-12 rounded-full cursor-pointer border-2 border-white shadow-lg transition duration-200 transform hover:scale-105"
          onClick={handleProfileClick} // Handle the profile click
        />
        <h2
          className="text-xl font-semibold text-white cursor-pointer hover:underline"
          onClick={handleProfileClick} // Handle the profile click
        >
          {selectedConversation.fullname}
        </h2>
      </div>
    </div>
  );
};
