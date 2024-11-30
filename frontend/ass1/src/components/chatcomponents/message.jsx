import React from "react";

export const Message = ({ isSender, text, time, avatar }) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} items-center`}>
      {/* Avatar for the other person */}
      {!isSender && avatar && (
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-300 to-pink-300 rounded-full mr-3">
          <img src={avatar} alt="Recipient Avatar" className="w-full h-full rounded-full object-cover" />
        </div>
      )}

      {/* Message Box */}
      <div className={`max-w-xs p-3 text-sm rounded-lg shadow-md ${isSender ? "bg-indigo-500 text-white" : "bg-white text-gray-700"}`}>
        <p>{text}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
};
