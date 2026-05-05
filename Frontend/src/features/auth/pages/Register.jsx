import React, { useState } from "react";
import { Link } from "react-router";
import Formgroup from "../components/Formgroup.jsx";
import "../styles/Register.scss";
import { useAuth } from "../hook/useAuth.js";
import { useNavigate } from "react-router";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister({email,username, password})
    navigate("/")
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
          <Formgroup
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <Formgroup
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Formgroup
           label="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            type="password" />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
