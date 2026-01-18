const express = require("express");
const urlRoutes = require("./routes/url.routes");
const arcjetMiddleware = require("./middlewares/ratelimit.middleware");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");



const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use(arcjetMiddleware);
app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("URL Shortener API is running ");
});

app.use("/", urlRoutes);

module.exports = app;
