import React, { useState } from "react";
import Formgroup from "../components/Formgroup";
import "../styles/Login.scss";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit}>
          <Formgroup
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
          <Formgroup
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
