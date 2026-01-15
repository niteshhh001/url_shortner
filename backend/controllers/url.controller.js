const urlService = require("../services/url.service");

exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ error: "longUrl is required" });
    }

    const shortCode = await urlService.createShortUrl(longUrl);

    res.status(201).json({
      shortUrl: `http://localhost:3000/${shortCode}`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  const longUrl = await urlService.getLongUrl(shortCode);

  if (!longUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(longUrl);
};
