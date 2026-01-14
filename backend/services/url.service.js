const store = require("../data/store");
const generateCode = require("../utils/generateCode");

function createShortUrl(longUrl) {
  const shortCode = generateCode(6);

  store.set(shortCode, {
    longUrl,
    createdAt: new Date(),
    clicks: 0,
  });

  return shortCode;
}

function getLongUrl(shortCode) {
  const data = store.get(shortCode);

  if (!data) return null;

  data.clicks += 1;
  return data.longUrl;
}

module.exports = {
  createShortUrl,
  getLongUrl,
};
