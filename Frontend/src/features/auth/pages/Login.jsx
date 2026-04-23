import React, { useState } from "react";
import Formgroup from "../components/Formgroup";
import "../styles/Login.scss";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Formgroup label="Email" placeholder="Enter Your Emial" />
          <Formgroup label="Password" placeholder="Enter Your Password" />
          <button className="button">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
