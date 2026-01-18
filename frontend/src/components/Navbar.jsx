import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🔗 URL Shortener</div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.primaryBtn}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "16px 40px",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    zIndex: 1000,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: 20,
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: 14,
  },
  primaryBtn: {
    background: "#fff",
    color: "#667eea",
    padding: "8px 14px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 14,
  },
  logoutBtn: {
    background: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
};
