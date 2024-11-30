import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authcontext';

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setauthuser } = useAuthContext()

    const signup = async ({ fullname, username, email, password, confirmpassword, gender }) => {
        const success = handleInputErrors({ fullname, username, email, password, confirmpassword, gender });

        if (!success) {
            return;
        }
        setLoading(true);
        try {
            // Prepare data to send to backend
            const data = { fullname, username, email, password, confirmpassword, gender };
            console.log(data);

            // Send POST request
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/signup`, data, {
                withCredentials: true, // Allows cookies to be sent and received
            });

            // Check the response data (Axios directly returns response data)
            const result = res.data; // No need for .json()

            // Handle success (for now, just log it)
            console.log(result);

            localStorage.setItem("chat-user", JSON.stringify(result))
            setauthuser(result)

        } catch (error) {
            // Display error message
            toast.error(error.message || 'Something went wrong');
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    const handleInputErrors = ({ fullname, username, email, password, confirmpassword, gender }) => {
        // Check for missing fields
        if (!fullname.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmpassword.trim() || !gender.trim()) {
            toast.error('All fields are required!');
            return false;
        }

        // Validate email format (basic check)
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            toast.error('Please enter a valid email address!');
            return false;
        }

        // Validate password strength (at least 6 characters)
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long!');
            return false;
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            toast.error('Passwords do not match!');
            return false;
        }

        // Check for gender selection
        if (gender !== "male" && gender !== "female") {
            toast.error('Please select a valid gender!');
            return false;
        }

        return true;
    };

    return { signup, loading };
};
