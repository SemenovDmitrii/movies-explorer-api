const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { JWT_KEY_SECRET } = require('../utils/config');
const {
  userNotFoundError,
  failedUpdateData,
  errorUpdateUser,
  errorCreateUser,
  emailErrorMessages,
} = require('../utils/message');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(userNotFoundError));
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => next(new NotFoundError(failedUpdateData)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailErrorMessages));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(errorUpdateUser));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    email,
    password: hash,
  })
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorCreateUser));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(emailErrorMessages));
        return;
      }
      next(err);
    }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production'
          ? process.env.JWT_SECRET
          : JWT_KEY_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
