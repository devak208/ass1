import { useState, useEffect } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { initializeAbly } from '../ws/ably';

export const useSendmessage = () => {
    const [loading, setLoading] = useState(false);
    const { setMessages, messages, selectedConversation } = useConversation();

    const sendmessage = async (message) => {
        if (!selectedConversation?._id) {
            toast.error("No conversation selected!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/messages/send/${selectedConversation._id}`,
                { message },
                { withCredentials: true }
            );

            const result = res.data;
            console.log("Response from server:", result);  // Log the server response

            if (result.error) throw new Error(result.error);

            // Log the state before and after setting messages
            console.log("Messages before update:", messages);

            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, result];  // Ensure a new reference
                console.log("Updated messages:", updatedMessages); // Log the updated state
                return updatedMessages; // Return updated array to set the state
              });
            

        } catch (error) {
            toast.error(error.message || "Error sending message");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            console.log("Messages updated, triggering re-render.");
        }
    }, [messages]);  // React to message updates

    useEffect(() => {
        if (!selectedConversation?._id) return;

        const handleAblyMessages = (data) => {
            console.log("Received Ably message:", data);
            if (data?.type === "NewMessage") {
                setMessages((prevMessages) => [...prevMessages, data.message]);
            }
        };

        const channel = initializeAbly(`conversation-${selectedConversation._id}`, handleAblyMessages);

        return () => {
            channel.unsubscribe();
            console.log("Unsubscribed from Ably channel");
        };
    }, [selectedConversation?._id, setMessages]);

    return { sendmessage, loading };
};
