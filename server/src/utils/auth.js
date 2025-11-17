const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';

const generateToken = (user) => {
  if (!user?._id) {
    throw new Error('User payload missing identifier');
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role || 'user'
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
};

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  generateToken,
  verifyToken
};

