const Ably = require("ably");
require("dotenv").config();

const ably = new Ably.Realtime({ key: process.env.ABLY_API_KEY });
let channels = {};

const getAblyChannel = (channelName) => {
    if (!channels[channelName]) {
        channels[channelName] = ably.channels.get(channelName);
    }
    return channels[channelName];
};

const broadcast = (channelName, data) => {
    try {
        const channel = getAblyChannel(channelName);
        channel.publish("message", JSON.stringify(data), (err) => {
            if (err) {
                console.error("Error broadcasting message:", err.message);
            } else {
                console.log("Message broadcasted successfully:", data);
            }
        });
    } catch (error) {
        console.error("Error in broadcasting via Ably:", error);
    }
};

const initializeAbly = () => ably;

module.exports = { initializeAbly, broadcast };
