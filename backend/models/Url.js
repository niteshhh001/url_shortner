const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  ip: String,
  country: String,
  device: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    unique: true,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  expiresAt: {
    type: Date,
    default: null,
  },

  //  Ownership
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  //  Creation tracking
  createdByIp: {
    type: String,
    required: true,
  },

  //  Analytics per click
  visits: [visitSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", urlSchema);
