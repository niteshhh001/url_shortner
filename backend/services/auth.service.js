const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(email, password) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
  });

  return user;
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return token;
}

module.exports = { register, login };
