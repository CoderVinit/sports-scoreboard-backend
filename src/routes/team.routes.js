const express = require('express');
const router = express.Router();
const multer = require('multer');
const teamController = require('../controllers/team.controller');

// Use memory storage so we can upload directly to Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);
// Attach upload.single middleware to handle optional logo file on create and update
router.post('/', upload.single('logo'), teamController.createTeam);
router.put('/:id', upload.single('logo'), teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
