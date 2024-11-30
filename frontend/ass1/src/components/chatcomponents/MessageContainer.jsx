import React from "react";
import { MessageHeader } from "./MessageHeader";
import { MessageBody } from "./MessageBody";
import { MessageInput } from "./MessageInput";

export const MessageContainer = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <MessageHeader />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto h-full ">
        <MessageBody />
      </div>

      {/* Input */}
      <div className="p-4 bg-white shadow-md border-t">
        <MessageInput />
      </div>
    </div>
  );
};
