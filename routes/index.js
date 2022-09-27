const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../utils/validation');
const NotFoundError = require('../errors/NotFoundError');
const { pageNotFound } = require('../utils/message');

router.all('/', auth);
router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', () => {
  throw new NotFoundError(pageNotFound);
});

module.exports = router;
