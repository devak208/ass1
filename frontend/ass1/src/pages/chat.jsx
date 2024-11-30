import React from "react";
import { SlideBar } from "../components/chatcomponents/SlideBar";
import { MessageContainer } from "../components/chatcomponents/MessageContainer";
import useConversation from "../zustand/useConversation"; // Zustand store for conversation state

export const Chat = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="h-screen flex lg:flex-row bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      {/* Sidebar */}
      <div
        className={`${
          selectedConversation ? "hidden" : "flex"
        } w-full lg:w-1/4 bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 border-r lg:flex flex-col  shadow-lg`}
      >
        <SlideBar />
      </div>

      {/* Message Container */}
      <div
        className={`${
          selectedConversation ? "flex" : "hidden"
        } flex-1 lg:flex flex-col bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};
