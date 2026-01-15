const express = require("express");
const urlRoutes = require("./routes/url.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("URL Shortener API is running ");
});

app.use("/", urlRoutes);

module.exports = app;
