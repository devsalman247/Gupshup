const jwt = require('jsonwebtoken'),
      secret = require('../config/env/development').secret;

const auth = {};

module.exports = auth;