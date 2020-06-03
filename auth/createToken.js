const jwt = require('jsonwebtoken');
const secret = require('./secrets.js');

module.exports = function createToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    user_type: user.user_type
  };

  const options = {
    expiresIn: '8h'
  };
  return jwt.sign(payload, secret.jwtSecret, options);
};