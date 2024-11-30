import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authcontext";
import { FaCommentDots } from "react-icons/fa";

export const Header = () => {
  const navigate = useNavigate();
  const { authuser } = useAuthContext();

  const handleUsernameClick = () => {
    navigate(`/profile/${authuser._id}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-b-sm shadow-lg z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Home</h1>
        <div className="flex items-center space-x-4">
          {/* Message Button */}
          <button
            onClick={() => navigate("/chat")}
            className="p-2 bg-white text-indigo-600 rounded-full shadow hover:bg-indigo-100 transition"
          >
            <FaCommentDots size={20} />
          </button>

          {/* Profile Button */}
          <button onClick={handleUsernameClick} className="flex items-center space-x-2">
            <img
              src={authuser?.profilePic || "/default-avatar.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
