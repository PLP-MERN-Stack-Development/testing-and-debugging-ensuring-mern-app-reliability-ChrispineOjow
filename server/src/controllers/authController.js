const User = require('../models/User');
const { generateToken } = require('../utils/auth');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const user = await User.create({ username, email, password });
  const token = generateToken(user);
  res.status(201).json({
    user: { _id: user._id, username: user.username, email: user.email },
    token
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({
    user: { _id: user._id, username: user.username, email: user.email },
    token
  });
};

const profile = (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  profile
};

