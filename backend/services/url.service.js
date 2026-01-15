const Url = require("../models/Url");
const generateCode = require("../utils/generateCode");
const validateUrl = require("../utils/validator");
const DEFAULT_EXPIRY_DAYS = 30;
const geoip = require("geoip-lite");

async function createShortUrl(longUrl, customAlias, expiresAt,userId,ip) {
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
    userId,
    createdByIp: ip,
  });

  return newUrl.shortCode;
}

async function getLongUrl(shortCode, req) {
  const url = await Url.findOne({ shortCode });

  if (!url) return { error: "NOT_FOUND" };

  if (url.expiresAt && url.expiresAt < new Date()) {
    return { error: "EXPIRED" };
  }

  const ip = req.ip;
  const userAgent = req.headers["user-agent"];

  const device = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

  // Example: country stub (we'll improve next)
  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : "Unknown";
  url.clicks += 1;
  url.visits.push({
    ip,
    device,
    country,
    userAgent,
  });

  await url.save();

  return { longUrl: url.longUrl };
}


module.exports = {
  createShortUrl,
  getLongUrl,
};
