import React from "react";
import { useGetConversation } from "../../hooks/useGetConversation";
import useConversation from "../../zustand/useConversation";

export const Conversation = () => {
  const { loading, conversation } = useGetConversation();
  const { setSelectedConversation, selectedConversation } = useConversation();

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!conversation || conversation.length === 0) {
    return <p className="text-gray-500 text-center">No conversations found.</p>;
  }

  return (
    <div className="space-y-4">
      {conversation.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedConversation(user)}
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
            selectedConversation?._id === user._id
              ? "bg-blue-500 text-white"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <img
            src={user.profilePic || "/default-avatar.jpg"}
            alt={user.username}
            className="w-12 h-12 rounded-full bg-gray-200"
          />
          <div className="flex-1">
            <h3 className="text-sm font-medium">{user.fullname}</h3>
            <p className="text-xs text-gray-400">{user.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
