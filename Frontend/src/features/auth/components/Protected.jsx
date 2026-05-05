import React from 'react'
import { useAuth } from '../hook/useAuth';
import { Navigate } from 'react-router'
import "../styles/Login.scss";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
   
  if (loading) {
    return (
      <main className="login-page">
        <div className="form-container">
          <h1>Loading Moodify...</h1>
          <p>Please wait while we prepare your music space.</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;
