const validator = require("validator");
const axios = require("axios");

const blockedDomains = ["malware.com", "phishing.com"];

async function validateUrl(longUrl) {
  // 1. Syntax validation
  if (!validator.isURL(longUrl, { require_protocol: true })) {
    throw new Error("Invalid URL format. Must include http/https");
  }

  // 2. Blacklist check
  const hostname = new URL(longUrl).hostname;
  if (blockedDomains.includes(hostname)) {
    throw new Error("This domain is blocked");
  }

  // 3. Reachability check
  try {
    await axios.get(longUrl, { timeout: 5000 });
  } catch (err) {
    throw new Error("URL is not reachable");
  }

  return true;
}

module.exports = validateUrl;
