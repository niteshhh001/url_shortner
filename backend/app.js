const express = require("express");

//const urlRoutes = require("./routes/url.routes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("URL Shortener API is running 🚀");
});

// Routes
//app.use("/", urlRoutes);

// Global error handler (basic for now)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = app;
