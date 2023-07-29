const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./authentication');

router.use(authRoutes);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
