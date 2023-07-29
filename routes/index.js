const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./authentication');
const auth = require('../middlewares/auth');

router.use(authRoutes);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
