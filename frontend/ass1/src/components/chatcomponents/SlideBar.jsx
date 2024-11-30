import React from "react";
import { SearchBar } from "./SearchBar";
import { Conversation } from "./Conversation";
import useConversation from "../../zustand/useConversation"; // Zustand store for managing state

export const SlideBar = () => {
  const { setSelectedConversation, selectedConversation } = useConversation();

  return (
    <div className="p-4 space-y-4">
      {/* Back Button for Mobile */}
      {selectedConversation && (
        <button
          onClick={() => setSelectedConversation(null)} // Clear selected conversation
          className="p-2 text-gray-500 bg-gray-100 rounded-full lg:hidden hover:bg-indigo-200 transition-all"
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
      )}

      {/* Search Bar */}
      <SearchBar />

      {/* Conversation List */}
      {!selectedConversation && (
        <div className="text-sm font-semibold text-gray-500">Conversations</div>
      )}
      <div className="space-y-4">
        <Conversation />
      </div>
    </div>
  );
};
