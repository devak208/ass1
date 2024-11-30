import Ably from "ably";

const ablyKey = process.env.REACT_APP_ABLY_API_KEY;
const ably = new Ably.Realtime({ key: ablyKey });

const initializeAbly = (channelName, onMessage) => {
    const channel = ably.channels.get(channelName);

    channel.subscribe("message", (message) => {
        const data = JSON.parse(message.data);
        onMessage(data);
    });

    return channel;
};

export { initializeAbly };
