import { useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [status, setStatus] = useState("");

  const testBackend = async () => {
    try {
      const res = await api.get("/");
      setStatus(res.data);
    } catch (err) {
      setStatus("Backend not reachable");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>URL Shortener</h1>
      <button onClick={testBackend}>Test Backend</button>
      <p>{status}</p>
    </div>
  );
}
