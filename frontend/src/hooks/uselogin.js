import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authcontext';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setauthuser } = useAuthContext(); // Destructure setauthuser from context

  const loginform = async (username, password) => {
    setLoading(true);
    try {
      // Sending the POST request to the backend with emailOrUsername and password
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
        emailOrUsername: username,
        password: password,
      }, {
        withCredentials: true, // Allows cookies to be sent and received
      });

      // Handle success
      const result = response.data; // Response data

      // Store user data in localStorage and update context
      localStorage.setItem("chat-user", JSON.stringify(result));
      setauthuser(result);

      console.log("Login successful:", result);

    } catch (error) {
      // Display error message from response or default error message
      toast.error(error.response?.data?.message || 'Login failed! Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { loginform, loading };
};
