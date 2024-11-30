const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { broadcast } = require("../ws/ably"); // Import broadcast

exports.sendmessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save();

        if (newMessage) {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }

        // Broadcast the message
        const broadcastData = {
            type: "NewMessage",
            message: {
                _id: newMessage._id,
                senderId,
                receiverId,
                message,
                createdAt: newMessage.createdAt,
            },
        };

        broadcast(`conversation-${conversation._id}`, broadcastData);

        res.status(201).json(broadcastData.message); // Send only the message object in the response
    } catch (error) {
        console.error("Error in sendmessage controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch messages for a conversation
exports.getmessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]); // No messages found
        }

        const messages = conversation.messages;
        res.status(200).json(messages); // Return all messages
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
