const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protected routes (add authentication middleware in production)
router.get('/profile/:userId', authController.getProfile);
router.put('/profile/:userId', authController.updateProfile);

module.exports = router;
