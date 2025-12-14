const { Team, Player } = require('../models');
const cloudinary = require('../config/cloudinary');

// Helper to upload an image buffer to Cloudinary
const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'sports-scoreboard' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: Player,
          as: 'players',
          attributes: ['id']
        }
      ]
    });

    // Add player count to each team
    const teamsWithCount = teams.map(team => {
      const teamData = team.toJSON();
      teamData.playerCount = teamData.players ? teamData.players.length : 0;
      delete teamData.players; // Remove the players array, we only need the count
      return teamData;
    });

    res.json({
      success: true,
      data: teamsWithCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message
    });
  }
};

// Get team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
    
    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message
    });
  }
};

// Create team
exports.createTeam = async (req, res) => {
  try {
    const { name, shortName, logo } = req.body;

    let logoUrl = logo || null;

    // If a logo file is uploaded, upload it to Cloudinary and use that URL
    if (req.file) {
      try {
        const uploadResult = await uploadFromBuffer(req.file.buffer);
        logoUrl = uploadResult.secure_url;
      } catch (uploadError) {
        return res.status(400).json({
          success: false,
          message: 'Error uploading team logo',
          error: uploadError.message,
        });
      }
    }

    const teamData = {
      ...req.body,
      name,
      shortName,
      logo: logoUrl,
    };

    const team = await Team.create(teamData);
    res.status(201).json({
      success: true,
      data: team
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating team',
      error: error.message
    });
  }
};

// Update team
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    const { name, shortName, existingLogo, logo } = req.body;

    // Start with provided logo value (for JSON-based updates), then existingLogo hint, then current team logo
    let logoUrl = logo || existingLogo || team.logo || null;

    // If a new file is uploaded, upload it to Cloudinary and use that URL
    if (req.file) {
      try {
        const uploadResult = await uploadFromBuffer(req.file.buffer);
        logoUrl = uploadResult.secure_url;
      } catch (uploadError) {
        return res.status(400).json({
          success: false,
          message: 'Error uploading team logo',
          error: uploadError.message,
        });
      }
    }

    await team.update({
      name: typeof name === 'string' && name.trim() ? name : team.name,
      shortName: typeof shortName === 'string' && shortName.trim() ? shortName : team.shortName,
      logo: logoUrl,
    });
    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating team',
      error: error.message
    });
  }
};

// Delete team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
    
    await team.destroy();
    res.json({
      success: true,
      message: 'Team deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team',
      error: error.message
    });
  }
};
