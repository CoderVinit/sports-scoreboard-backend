const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

router.get('/', matchController.getAllMatches);
router.get('/:id', matchController.getMatchDetails);
router.get('/:id/scorecard', matchController.getLiveScorecard);
router.post('/', matchController.createMatch);
router.put('/:id', matchController.updateMatchStatus);
router.delete('/:id', matchController.deleteMatch);

module.exports = router;
