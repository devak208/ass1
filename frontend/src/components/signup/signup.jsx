import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";

export const Signup = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        gender: "",
    });
    const { loading, signup } = useSignUp();  // Corrected variable name to "loading"
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match!");
            return;
        }
        await signup(formData); // Call the signup function from the hook

        // Send formData to the backend for processing
        console.log("Form Data Submitted: ", formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-md shadow-lg bg-opacity-20">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Sign Up
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="fullname"
                            className="block mb-1 text-sm font-medium text-gray-600"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-1 text-sm font-medium text-gray-600"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a unique username"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmpassword"
                            className="block mb-1 text-sm font-medium text-gray-600"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            placeholder="Re-enter your password"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label
                            htmlFor="gender"
                            className="block mb-1 text-sm font-medium text-gray-600"
                        >
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        >
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}  // Disable button when loading
                        className="w-full px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        {loading ? (
                            <span className="flex justify-center items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mr-2 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path
                                        d="M4 12a8 8 0 018-8"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                </svg>
                                Loading...
                            </span>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="font-medium text-indigo-500 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};
