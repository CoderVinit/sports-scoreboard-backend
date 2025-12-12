const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.controller');

router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.get('/team/:teamId/squad', playerController.getTeamSquad);
router.post('/', playerController.createPlayer);
router.put('/:id', playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);

module.exports = router;
