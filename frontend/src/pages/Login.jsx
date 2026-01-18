import { useState } from "react";
import api from "../api/axios";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -20;
    const rotateY = ((x / rect.width) - 0.5) * 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (e) => {
    e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="login-container">
      <div
        className="login-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
      >
        <h2>Welcome Back</h2>
        <p>Login to manage your links</p>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}
