const { serverErrorMessages } = require('../utils/message');

const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500
      ? serverErrorMessages
      : message,
  });
  next();
};

module.exports = errorHandler;
