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

  const result = await urlService.getLongUrl(shortCode);

  if (result?.error === "NOT_FOUND") {
    return res.status(404).json({ error: "Short URL not found" });
  }

  if (result?.error === "EXPIRED") {
    return res.status(410).json({ error: "This short URL has expired" });
  }

  res.redirect(result.longUrl);
};
