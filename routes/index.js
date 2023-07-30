const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./authentication');
const auth = require('../middlewares/auth');

const NotFoundError = require('../utils/errors/NotFoundError');

router.use(authRoutes);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Здесь ничего нет'));
});

module.exports = router;
