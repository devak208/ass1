const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");

exports.loginuser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Check if emailOrUsername and password are provided
        if (!emailOrUsername || !password) {
            return res.status(400).json({ error: "Both email/username and password are required" });
        }

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });

        // Check if the user exists and if the password matches
        if (!user) {
            return res.status(400).json({ error: "Invalid email/username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email/username or password" });
        }

        // Generate JWT token and set it as a cookie
        generateTokenAndSetCookie(user._id, res);

        // Send user data in the response
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            followers: user.followers,  // Adding followers
            following: user.following,  // Adding following
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); // Clear the JWT cookie
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.signup = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmpassword, gender } = req.body;

        // Validate request data
        if (!fullname || !username || !email || !password || !confirmpassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Assign profile picture based on gender
        const profilePic = gender === "male" 
            ? `https://avatar.iran.liara.run/public/boy?username=${username}` 
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create and save the user
        const newUser = new User({
            fullname,
            username,
            email, // Ensure email is saved
            password: hashedPassword,
            gender,
            profilePic,
            
        });

        await newUser.save();

        // Generate token and set cookie
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic,
            followers: user.followers,  // Adding followers
            following: user.following,  // Adding following
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

