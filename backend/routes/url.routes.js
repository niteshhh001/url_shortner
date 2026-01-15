const express = require("express");
const router = express.Router();
const urlController = require("../controllers/url.controller");
const optionalAuth = require("../middlewares/optionalAuth.middleware");
const requireAuth = require("../middlewares/auth.middleware");

// Protect shorten endpoint with auth
router.post("/shorten", optionalAuth, urlController.shortenUrl);

router.get("/:shortCode", urlController.redirectUrl);

//   DASHBOARD ROUTES (auth required)
router.get("/me/urls", requireAuth, urlController.getMyUrls);
router.delete("/urls/:id", requireAuth, urlController.deleteUrl);
router.patch("/urls/:id/expiry", requireAuth, urlController.updateExpiry);
router.get("/urls/:id/analytics", requireAuth, urlController.getAnalytics);

module.exports = router;
