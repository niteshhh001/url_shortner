const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    await authService.register(email, password);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
