import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authcontext';
import { PostProvider } from './context/postcontext'; // Import PostProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostProvider> {/* Wrap your app with PostProvider */}
        <App />
      </PostProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
