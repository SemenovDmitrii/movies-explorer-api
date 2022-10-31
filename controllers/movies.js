const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');
const {
  errorData,
  serverErrorMessages,
  movieNotFoundError,
  movieErrorMessages,
  removeMovie,
} = require('../utils/message');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorData));
      } else {
        next(new InternalServerError(serverErrorMessages));
      }
    });
};

module.exports.removeMoviesId = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(movieNotFoundError));
        return;
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        next(new ForbiddenError(movieErrorMessages));
        return;
      }
      movie
        .remove()
        .then(() => {
          res.send({ message: removeMovie });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorData));
      } else {
        next(new InternalServerError(serverErrorMessages));
      }
    });
};
