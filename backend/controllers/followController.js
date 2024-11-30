const User = require("../models/userModels");

exports.followUser = async (req, res) => {
    try {
        const { id: userIdToFollow } = req.params; // ID of the user to follow/unfollow
        const currentUserId = req.user._id; // ID of the current authenticated user

        console.log(`Attempting to follow/unfollow userId: ${userIdToFollow} by userId: ${currentUserId}`);

        // Find users in the database
        const userToFollow = await User.findById(userIdToFollow);
        const currentUser = await User.findById(currentUserId);

        if (!userToFollow) {
            return res.status(404).json({ error: "User to follow not found" });
        }
        if (!currentUser) {
            return res.status(404).json({ error: "Current user not found" });
        }

        // Check if the current user is already following the userToFollow
        const isFollowing = userToFollow.followers.includes(currentUserId);

        if (isFollowing) {
            // Unfollow logic
            userToFollow.followers = userToFollow.followers.filter(
                (id) => id.toString() !== currentUserId.toString()
            );
            currentUser.following = currentUser.following.filter(
                (id) => id.toString() !== userIdToFollow.toString()
            );
        } else {
            // Follow logic
            userToFollow.followers.push(currentUserId);
            currentUser.following.push(userIdToFollow);
        }

        // Save both users
        await userToFollow.save();
        await currentUser.save();

        res.status(200).json({ message: isFollowing ? "Unfollowed" : "Followed", userToFollow, currentUser });
    } catch (error) {
        console.error("Follow/Unfollow error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

