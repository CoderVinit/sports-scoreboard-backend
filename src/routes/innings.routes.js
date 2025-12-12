const express = require('express');
const router = express.Router();
const inningsController = require('../controllers/innings.controller');

router.post('/', inningsController.createInnings);
router.get('/:id', inningsController.getInningsById);
router.get('/match/:matchId', inningsController.getMatchInnings);
router.put('/:id', inningsController.updateInnings);

module.exports = router;
