let aj;
let isSpoofedBot;

(async () => {
  const arcjetModule = await import("@arcjet/node");
  const inspectModule = await import("@arcjet/inspect");

  const arcjet = arcjetModule.default;
  const { shield, detectBot, tokenBucket } = arcjetModule;
  isSpoofedBot = inspectModule.isSpoofedBot;

  aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE"],
      }),
      tokenBucket({
        mode: "LIVE",
        refillRate: 5,
        interval: 10,
        capacity: 10,
      }),
    ],
  });
})();
async function arcjetMiddleware(req, res, next) {
  try {
    if (!aj) return next(); // safety fallback while loading

    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too many requests" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bots not allowed" });
      }
      return res.status(403).json({ error: "Forbidden" });
    }

    if (decision.ip?.isHosting()) {
      return res.status(403).json({ error: "Hosting IP blocked" });
    }

    if (decision.results?.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Spoofed bot detected" });
    }

    next();
  } catch (err) {
    console.error("Arcjet error:", err.message);
    next(); // fail open
  }
}

module.exports = arcjetMiddleware;
