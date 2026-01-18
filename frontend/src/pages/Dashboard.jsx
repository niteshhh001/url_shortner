import { useEffect, useState } from "react";
import api from "../api/axios";
import { getToken } from "../utils/auth";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUrls = async () => {
    try {
      const res = await api.get("/me/urls", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setUrls(res.data);
    } catch (err) {
      setError("Failed to load URLs");
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = async (id) => {
    if (!confirm("Are you sure you want to delete this URL?")) return;

    try {
      await api.delete(`/urls/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setUrls(urls.filter((u) => u._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (loading) {
    return <div style={styles.center}>Loading dashboard...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Your Dashboard</h1>

      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {urls.length === 0 ? (
        <p style={{ opacity: 0.7 }}>You have not created any URLs yet.</p>
      ) : (
        <div style={styles.grid}>
          {urls.map((url) => {
            const short = `http://localhost:3000/${url.shortCode}`;

            return (
              <div key={url._id} style={styles.card}>
                <p><strong>Short:</strong> <a href={short} target="_blank">{short}</a></p>
                <p><strong>Original:</strong> {url.longUrl}</p>
                <p><strong>Clicks:</strong> {url.clicks}</p>
                <p>
                  <strong>Expires:</strong>{" "}
                  {url.expiresAt
                    ? new Date(url.expiresAt).toLocaleDateString()
                    : "Never"}
                </p>

                <div style={styles.actions}>
                  <button onClick={() => navigator.clipboard.writeText(short)}>
                    Copy
                  </button>
                  <button onClick={() => deleteUrl(url._id)} style={styles.danger}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    paddingTop: 120,
    paddingInline: 40,
    color: "white",
    background: "linear-gradient(135deg, #667eea, #764ba2)",

  },
  title: {
    marginBottom: 30,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 16,
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    wordBreak: "break-all",
  },
  actions: {
    marginTop: 10,
    display: "flex",
    gap: 10,
  },
  danger: {
    background: "crimson",
    color: "white",
  },
  center: {
    color: "white",
    paddingTop: 150,
    textAlign: "center",
  },
};
