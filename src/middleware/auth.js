const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/errors');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new ApiError(401, 'Authentication token required');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(403, 'Invalid or expired token');
  }
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      throw new ApiError(403, 'Insufficient permissions');
    }
    next();
  };
};