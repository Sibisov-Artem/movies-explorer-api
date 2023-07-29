const router = require('express').Router();
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

module.exports = router;