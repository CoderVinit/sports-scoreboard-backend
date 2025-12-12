const express = require('express');
const router = express.Router();
const ballController = require('../controllers/ball.controller');

router.post('/', ballController.recordBall);
router.get('/innings/:inningsId/over/:overNumber', ballController.getOver);
router.get('/innings/:inningsId/recent', ballController.getRecentBalls);

module.exports = router;
