const express = require("express");
const urlRoutes = require("./routes/url.routes");
const arcjetMiddleware = require("./middlewares/ratelimit.middleware");


const app = express();

app.use(express.json());

app.use(arcjetMiddleware);


app.get("/", (req, res) => {
  res.send("URL Shortener API is running ");
});

app.use("/", urlRoutes);

module.exports = app;
