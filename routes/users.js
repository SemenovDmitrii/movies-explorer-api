const router = require('express').Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { updateUserValidator } = require('../utils/validation');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserValidator, updateCurrentUser);

module.exports = router;
