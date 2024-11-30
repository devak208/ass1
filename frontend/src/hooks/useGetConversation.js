import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]); // Correct state name to `conversation`

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
                    withCredentials: true,
                }); // Replace with correct API endpoint
                const result = res.data;  // Directly use res.data without awaiting it

                if (result.error) {
                    throw new Error(result.error);
                }

                setConversation(result); // Store result in state
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversation(); // Make sure to call getConversation inside useEffect
    }, []);

    return { loading, conversation };  // Return `conversation` here
};
