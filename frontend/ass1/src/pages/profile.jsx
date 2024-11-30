import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AddPostModal } from "../components/profilecomponents/AddPost";
import { UserProfilePost } from "../components/profilecomponents/UserProfilePost";
import { FaUserPlus, FaUserTimes, FaSpinner, FaUsers, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuthContext } from "../context/authcontext";
import toast from "react-hot-toast";

export const ProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [isPostLoading, setIsPostLoading] = useState(false); // Add post loading state
    const { authuser, setauthuser } = useAuthContext();

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
            setauthuser(null);
            localStorage.removeItem("chat-user");
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    // Handle add post
    const handleAddPost = async (postData) => {
        setIsPostLoading(true); // Set post loading to true when starting the post request
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/posts/create`,
                postData,
                { withCredentials: true }
            );
            console.log("Post added successfully:", response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error adding post:", error);
            toast.error("Failed to add post. Please try again.");
        } finally {
            setIsPostLoading(false); // Set post loading to false when request completes
        }
    };

    // Fetch user data and check follow status
    useEffect(() => {
        if (!userId || !authuser) {
            console.error("User ID or authuser is missing!");
            return;
        }

        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/users/profile/${userId}`,
                    { withCredentials: true }
                );
                setUser(response.data.user);
                setIsFollowing(response.data.user?.followers?.includes(authuser?._id));
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId, authuser]);

    // Toggle follow/unfollow status
    const handleFollowToggle = async () => {
        setIsFollowLoading(true);
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/api/users/${userId}/follow`;
            await axios.post(url, {}, { withCredentials: true });
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Error toggling follow:", error);
        } finally {
            setIsFollowLoading(false);
        }
    };

    // Loader while fetching user data
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FaSpinner className="animate-spin text-blue-500" size={40} />
                <p className="ml-4 text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
            {/* Logout Button */}
            {userId === authuser?._id && (
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transition duration-200 flex items-center justify-center"
                >
                    <FaSignOutAlt />
                </button>
            )}

            {/* Profile Section */}
            <div className="flex flex-col items-center md:flex-row md:items-start mb-8 bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
                <img
                    src={user?.profilePic || "/default-avatar.jpg"}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full border-4 border-gray-200 mb-4 md:mb-0 md:mr-6 transition duration-300 transform hover:scale-105 hover:border-blue-500"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-semibold text-gray-800">{user?.username}</h2>
                    <p className="text-gray-600 mt-2">{user?.bio || "This user has not set a bio yet."}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Joined on {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
                    </p>

                    {/* Followers and Following Section */}
                    <div className="flex justify-center md:justify-start mt-4 space-x-6">
                        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-full">
                            <FaUsers size={18} className="text-blue-500" />
                            <span className="text-gray-700 font-medium">{user?.followers?.length} Followers</span>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-full">
                            <FaUser size={18} className="text-green-500" />
                            <span className="text-gray-700 font-medium">{user?.following?.length} Following</span>
                        </div>
                    </div>

                    {/* Follow/Unfollow Button */}
                    {userId !== authuser?._id && (
                        <button
                            onClick={handleFollowToggle}
                            className={`mt-4 px-6 py-2 rounded-lg shadow-lg transition duration-200 transform ${isFollowLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : isFollowing
                                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
                                        : "bg-gradient-to-r from-blue-500 via-teal-500 to-blue-600 hover:from-blue-600 hover:via-teal-600 hover:to-blue-700"
                                } text-white flex items-center justify-center`}
                            disabled={isFollowLoading}
                        >
                            {isFollowLoading ? (
                                <FaSpinner className="animate-spin" size={20} />
                            ) : isFollowing ? (
                                <>
                                    <FaUserTimes className="mr-2" /> Unfollow
                                </>
                            ) : (
                                <>
                                    <FaUserPlus className="mr-2" /> Follow
                                </>
                            )}
                        </button>
                    )}
                    
                    {/* Add Post Button (if it's the user's profile) */}
                    {userId === authuser._id && (
                        <div className="text-center mb-8 space-y-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-200"
                                disabled={isPostLoading} // Disable button when post is loading
                            >
                                {isPostLoading ? (
                                    <FaSpinner className="animate-spin" size={20} />
                                ) : (
                                    "Add Post"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Post Modal */}
            <AddPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddPost={handleAddPost}
            />

            {/* User Posts Section */}
            <h3 className="font-semibold text-gray-800 mb-4 text-lg text-center">
                Posts by {user?.username}
            </h3>
            <UserProfilePost userId={userId} />
        </div>
    );
};
