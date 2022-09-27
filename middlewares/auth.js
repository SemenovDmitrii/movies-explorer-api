const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const { JWT_KEY_SECRET } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { authorizedError } = require('../utils/message');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(authorizedError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_KEY_SECRET);
  } catch (err) {
    throw new UnauthorizedError(authorizedError);
  }
  req.user = payload;
  return next();
};
