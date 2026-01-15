const express = require("express");
const router = express.Router();
const urlController = require("../controllers/url.controller");
const optionalAuth = require("../middlewares/optionalAuth.middleware");

// Protect shorten endpoint with auth
router.post("/shorten", optionalAuth, urlController.shortenUrl);

router.get("/:shortCode", urlController.redirectUrl);

module.exports = router;
