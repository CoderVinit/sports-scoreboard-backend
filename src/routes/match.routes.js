const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

// Get routes
router.get('/', matchController.getAllMatches);
router.get('/live', matchController.getLiveMatches);
router.get('/upcoming', matchController.getUpcomingMatches);
router.get('/completed', matchController.getCompletedMatches);
router.get('/:id', matchController.getMatchDetails);
router.get('/:id/scorecard', matchController.getLiveScorecard);
router.get('/:id/statistics', matchController.getMatchStatistics);
router.get('/:id/commentary', matchController.getMatchCommentary);

// Post routes
router.post('/', matchController.createMatch);

// Put routes
router.put('/:id', matchController.updateMatchStatus);

// Delete routes
router.delete('/:id', matchController.deleteMatch);

module.exports = router;
