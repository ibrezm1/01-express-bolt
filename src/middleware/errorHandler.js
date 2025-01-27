const logger = require('../utils/logger');
const { ApiError } = require('../utils/errors');

exports.errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: err.message
    });
  }

  return res.status(500).json({
    error: 'Internal Server Error'
  });
};