import { useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    setError("");
    setShortUrl("");

    if (!longUrl) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/shorten", {
        longUrl,
        customAlias: customAlias || undefined,
      });

      setShortUrl(res.data.shortUrl);
      setLongUrl("");
      setCustomAlias("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔗 URL Shortener</h1>
        <p style={styles.subtitle}>
          Shorten your long links into clean, shareable URLs
        </p>

        <input
          style={styles.input}
          placeholder="Enter your long URL..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Custom alias (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
        />

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handleShorten}
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {shortUrl && (
          <div style={styles.resultBox}>
            <p style={{ marginBottom: 8 }}>Your short URL:</p>
            <div style={styles.resultRow}>
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
              <button onClick={copyToClipboard} style={styles.copyBtn}>
                Copy
              </button>
            </div>
          </div>
        )}

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
 container: {
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 100,
},

  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 30,
    width: "100%",
    maxWidth: 480,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 5,
  },
  resultBox: {
    marginTop: 20,
    background: "#f7f7f7",
    padding: 15,
    borderRadius: 10,
  },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    wordBreak: "break-all",
  },
  copyBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: {
    marginTop: 15,
    color: "crimson",
    fontSize: 14,
  },
};
