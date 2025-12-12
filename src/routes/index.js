const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const teamRoutes = require('./team.routes');
const matchRoutes = require('./match.routes');
const playerRoutes = require('./player.routes');
const inningsRoutes = require('./innings.routes');
const ballRoutes = require('./ball.routes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/matches', matchRoutes);
router.use('/players', playerRoutes);
router.use('/innings', inningsRoutes);
router.use('/balls', ballRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = router;
