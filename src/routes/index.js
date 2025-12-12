const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const teamRoutes = require('./team.routes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = router;
