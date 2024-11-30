import React from "react";

export const SearchBar = () => {
  return (
    <form className="flex items-center gap-3 p-2 bg-white rounded-full shadow-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none rounded-full focus:outline-none"
      />
      <button
        type="submit"
        className="p-2 text-white bg-pink-500 rounded-full hover:bg-pink-600 transition-all duration-300"
      >
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};
