import React, { useEffect, useRef } from "react";
import { useAuthContext } from "../../context/authcontext";
import useConversation from "../../zustand/useConversation";
import { useGetMessages } from "../../hooks/useGetMessages";
import { Message } from "./message";  // Import the Message component to reuse

export const MessageBody = () => {
  const { authuser } = useAuthContext();  // Current user details
  const { messages, selectedConversation } = useConversation();  // Access messages from Zustand store
  const { loading } = useGetMessages();  // Get loading state from the hook
  const messageContainerRef = useRef(null);  // Reference to the message container

  console.log("Messages in MessageBody:", messages);  // Log messages in the component


  if (!selectedConversation) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No conversation selected.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center text-white">Loading messages...</div>;
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No messages found.</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full space-y-4 overflow-y-auto p-4 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300 rounded-lg shadow-lg"
      ref={messageContainerRef}
      style={{ maxHeight: "80vh" }}  // Optional: Set a max height for the container
    >
      {messages.map((message) => {
        const isSender = message.senderId === authuser._id;  // Determine if the message is from the user or someone else
        const avatar = isSender ? authuser.profilePic : selectedConversation.profilePic;  // Avatar based on sender/receiver
        
        return (
          <Message
            key={message._id}
            isSender={isSender}
            text={message.message}
            time={new Date(message.createdAt).toLocaleTimeString()}
            avatar={avatar || "/default-avatar.png"}  // Default avatar if none provided
          />
        );
      })}
    </div>
  );
};
