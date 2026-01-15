const urlService = require("../services/url.service");

exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, expiresAt } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: "longUrl is required" });
    }

    const shortCode = await urlService.createShortUrl(
      longUrl,
      customAlias,
      expiresAt
    );

    res.status(201).json({
      shortUrl: `http://localhost:3000/${shortCode}`,
    });
  } catch (err) {
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
