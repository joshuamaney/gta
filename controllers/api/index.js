const router = require('express').Router();
const userRoutes = require('./userRoutes');
const geocacheRoutes = require('./geocacheRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/users', userRoutes);
router.use('/geocaches', geocacheRoutes);
router.use('/location', locationRoutes);

module.exports = router;
