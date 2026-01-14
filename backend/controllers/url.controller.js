const urlService = require("../services/url.service");

exports.shortenUrl = (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "longUrl is required" });
  }

  const shortCode = urlService.createShortUrl(longUrl);

  res.status(201).json({
    shortUrl: `http://localhost:3000/${shortCode}`,
  });
};

exports.redirectUrl = (req, res) => {
  const { shortCode } = req.params;

  const longUrl = urlService.getLongUrl(shortCode);

  if (!longUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(longUrl);
};
