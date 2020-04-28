const jwt = require('jsonwebtoken');
const secret = require('./secrets.js');

module.exports = function createToken(user) {
  const payload = {
    subject: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    user_type: user.user_type
  };

  console.log(`My mistake: ${secret.jwtSecret}`);
  const options = {
    expiresIn: '8h'
  };
  return jwt.sign(payload, secret.jwtSecret, options);
};