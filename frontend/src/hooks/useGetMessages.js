import { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversation';
import axios from 'axios';

export const useGetMessages = () => {
    const { setMessages, selectedConversation, messages } = useConversation(); // Use setMessages and messages
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id || messages.length > 0) return; // Prevent fetching if already fetched

            setLoading(true);
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/messages/${selectedConversation._id}`,
                    { withCredentials: true }
                );
                const result = res.data;

                console.log("Fetched messages:", result);  // Log fetched messages

                if (result.error) throw new Error(result.error);

                setMessages(result); // Set messages from the server
            } catch (error) {
                console.error("Error fetching messages:", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) {
            getMessages(); // Fetch messages when conversation is selected
        }
    }, [selectedConversation?._id, messages, setMessages]); // Dependencies

    return { loading };
};
