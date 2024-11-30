import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Chat } from "./pages/chat";
import { Login } from "./components/login/login";
import { Signup } from "./components/signup/signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authcontext";
import { Home } from "./pages/home";
import { ProfilePage } from "./pages/profile";


const App = () => {
  const { authuser } = useAuthContext(); // Get the authenticated user from context

  return (
    <>
      <Router>
        <Routes>
          {/* Chat Route - Only accessible if authenticated */}
          <Route
            path="/chat"
            element={authuser ? <Chat /> : <Navigate to="/" />}
          />

          {/* Home Route - Only accessible if authenticated */}
          <Route
            path="/home"
            element={authuser ? <Home /> : <Navigate to="/" />}
          />

          {/* Profile Route - Only accessible if authenticated */}
        

          {/* Login Route - Only accessible if not authenticated */}
          <Route
            path="/"
            element={authuser ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/profile/:userId" element={<ProfilePage />} />



          {/* SignUp Route - Only accessible if not authenticated */}
          <Route
            path="/signup"
            element={authuser ? <Navigate to="/home" /> : <Signup />}
          />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
