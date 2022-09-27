const router = require('express').Router();
const { getMovies, createMovies, removeMoviesId } = require('../controllers/movies');
const { createMoviesValidator, removeMoviesValidator } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', createMoviesValidator, createMovies);
router.delete('/:movieId', removeMoviesValidator, removeMoviesId);

module.exports = router;
