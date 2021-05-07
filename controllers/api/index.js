const router = require('express').Router();
const userRoutes = require('./userRoutes');
const geocacheRoutes = require('./geocacheRoutes');

router.use('/users', userRoutes);
router.use('/geocaches', geocacheRoutes);

module.exports = router;
