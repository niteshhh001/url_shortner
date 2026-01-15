const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");
const validateUrl = require("../utils/validator");
const DEFAULT_EXPIRY_DAYS = 30;

async function createShortUrl(longUrl, customAlias, expiresAt) {
  await validateUrl(longUrl);

  let shortCode;

  if (customAlias) {
    const exists = await Url.findOne({ shortCode: customAlias });
    if (exists) {
      throw new Error("Custom alias already in use");
    }
    shortCode = customAlias;
  } else {
    let exists = true;
    while (exists) {
      shortCode = generateCode(6);
      exists = await Url.findOne({ shortCode });
    }
  }

  //  Default expiry = 30 days
  const expiryDate = expiresAt
    ? new Date(expiresAt)
    : new Date(Date.now() + DEFAULT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  const newUrl = await Url.create({
    longUrl,
    shortCode,
    expiresAt: expiryDate,
  });

  return newUrl.shortCode;
}

async function getLongUrl(shortCode) {
  const url = await Url.findOne({ shortCode });

  if (!url) return { error: "NOT_FOUND" };

  // Expiry check
  if (url.expiresAt && url.expiresAt < new Date()) {
    return { error: "EXPIRED" };
  }

  url.clicks += 1;
  await url.save();

  return { longUrl: url.longUrl };
}

module.exports = {
  createShortUrl,
  getLongUrl,
};
