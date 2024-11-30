import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/uselogin";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginform, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginform(username, password);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-white">Welcome Back</h1>
        <p className="text-center text-gray-200">Please log in to continue</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-white bg-opacity-30 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-white bg-opacity-30 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white transition bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-200">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-300 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
