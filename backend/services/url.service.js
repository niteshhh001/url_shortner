const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");
const validateUrl = require("../utils/validator");

async function createShortUrl(longUrl) {
  // Validation layer
  await validateUrl(longUrl);

  // Generate unique short code
  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = generateCode(6);
    exists = await Url.findOne({ shortCode });
  }

  const newUrl = await Url.create({
    longUrl,
    shortCode,
  });

  return newUrl.shortCode;
}

async function getLongUrl(shortCode) {
  const url = await Url.findOne({ shortCode });

  if (!url) return null;

  url.clicks += 1;
  await url.save();

  return url.longUrl;
}

module.exports = {
  createShortUrl,
  getLongUrl,
};
