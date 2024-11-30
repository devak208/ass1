import React, { useState } from "react";
import { useSendmessage } from "../../hooks/useSendmessage";

export const MessageInput = () => {
  const [messageText, setMessageText] = useState(""); // Manage the input state
  const { sendmessage, loading } = useSendmessage(); // Access the sendmessage function from the hook

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!messageText.trim()) {
      return; // Don't send empty messages
    }

    sendmessage(messageText);
    setMessageText(""); // Clear input field after sending message
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4 bg-gradient-to-br from-indigo-300 to-pink-300 rounded-lg shadow-lg">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Type your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)} // Update message text on input change
        className="flex-1 px-4 py-2 bg-white text-gray-700 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading} // Disable input when sending message
      />

      {/* Send Button */}
      <button
        type="submit"
        className="p-2 text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-all"
        disabled={loading} // Disable button when sending message
      >
        {loading ? (
          // Show loading spinner while sending message
          <svg
            className="animate-spin w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v9m0 0l-3-3m3 3l3-3"
            />
          </svg>
        ) : (
          // Show the send icon when not loading
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M22 2L11 13M22 2L15 21L11 13L2 11L22 2Z"
            />
          </svg>
        )}
      </button>
    </form>
  );
};
