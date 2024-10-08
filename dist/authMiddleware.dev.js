"use strict";

var jwt = require('jsonwebtoken');

var authMiddleware = function authMiddleware(req, res, next) {
  var token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Access denied, token missing'
    });
  }

  try {
    var verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Invalid token'
    });
  }
};

module.exports = authMiddleware;
//# sourceMappingURL=authMiddleware.dev.js.map
