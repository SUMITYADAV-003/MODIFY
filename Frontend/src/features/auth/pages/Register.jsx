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
        <h1>Register user</h1>
        <form onSubmit={handleSubmit}>
          <Formgroup
            label="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your User"
          />
          <Formgroup
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
          <Formgroup
           label="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your password" />
          <button type="submit" className="button">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
