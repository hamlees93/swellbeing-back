// Middleware to verify user after they click reset password link //

const jwt = require('express-jwt')

const authenticated = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: (req) => {
    return req.body.token;
  },
});

module.exports = { authenticated };