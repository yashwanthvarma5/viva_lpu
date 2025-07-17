const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_SECRET, {
    expiresIn: "1d",
  });
};
exports.registerUsrer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res
      .status(201)
      .json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken(user._id);
    res, json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
