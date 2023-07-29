const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const AuthRoutes = require('./authentication');

router.use(AuthRoutes);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;
