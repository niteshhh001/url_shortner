const urlService = require("../services/url.service");
const Url = require("../models/Url");

exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, expiresAt } = req.body;

    const user = req.user; // may be null
    const ip = req.ip;

    // If user is NOT logged in apply limit
    if (!user) {
      const count = await Url.countDocuments({ createdByIp: ip });

      if (count >= 2) {
        return res.status(403).json({
          error: "Anonymous users can only create 2 short URLs. Please login.",
        });
      }
    }

    const shortCode = await urlService.createShortUrl(
      longUrl,
      customAlias,
      expiresAt,
      user?.id || null,
      ip
    );

    res.status(201).json({
      shortUrl: `http://localhost:3000/${shortCode}`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  const result = await urlService.getLongUrl(shortCode,req);

  if (result?.error === "NOT_FOUND") {
    return res.status(404).json({ error: "Short URL not found" });
  }

  if (result?.error === "EXPIRED") {
    return res.status(410).json({ error: "This short URL has expired" });
  }

  res.redirect(result.longUrl);
};

exports.getMyUrls = async (req, res) => {
  const urls = await Url.find({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.json(urls);
};

exports.deleteUrl = async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id });

  if (!url) return res.status(404).json({ error: "Not found" });

  if (url.userId.toString() !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });

  await url.deleteOne();
  res.json({ message: "Deleted successfully" });
};

exports.updateExpiry = async (req, res) => {
  const { expiresAt } = req.body;

  const url = await Url.findOne({ _id: req.params.id });

  if (!url) return res.status(404).json({ error: "Not found" });

  if (url.userId.toString() !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });

  url.expiresAt = new Date(expiresAt);
  await url.save();

  res.json({ message: "Expiry updated" });
};

exports.getAnalytics = async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id });

  if (!url) return res.status(404).json({ error: "Not found" });

  if (url.userId.toString() !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });

  // clicks per day
  const stats = {};

  url.visits.forEach(v => {
    const day = v.timestamp.toISOString().split("T")[0];
    stats[day] = (stats[day] || 0) + 1;
  });

  res.json({
    totalClicks: url.clicks,
    byDate: stats,
    recentVisits: url.visits.slice(-20),
  });
};

