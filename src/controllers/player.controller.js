const { Player, Team, PlayerMatchStats } = require('../models');

// Get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const { teamId, role, isActive } = req.query;
    const where = {};
    
    if (teamId) where.teamId = teamId;
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const players = await Player.findAll({
      where,
      include: [{ model: Team, as: 'team', attributes: ['id', 'name', 'shortName'] }],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      count: players.length,
      data: players
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching players',
      error: error.message
    });
  }
};

// Get player by ID with stats
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id, {
      include: [
        { model: Team, as: 'team' },
        {
          model: PlayerMatchStats,
          as: 'matchStats',
          limit: 10,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    res.json({
      success: true,
      data: player
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching player',
      error: error.message
    });
  }
};

// Create player
exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({
      success: true,
      data: player
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating player',
      error: error.message
    });
  }
};

// Update player
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    await player.update(req.body);
    res.json({
      success: true,
      data: player
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating player',
      error: error.message
    });
  }
};

// Delete player
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    await player.destroy();
    res.json({
      success: true,
      message: 'Player deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting player',
      error: error.message
    });
  }
};

// Get team squad
exports.getTeamSquad = async (req, res) => {
  try {
    const players = await Player.findAll({
      where: { teamId: req.params.teamId, isActive: true },
      order: [
        ['isCaptain', 'DESC'],
        ['isViceCaptain', 'DESC'],
        ['name', 'ASC']
      ]
    });

    res.json({
      success: true,
      count: players.length,
      data: players
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team squad',
      error: error.message
    });
  }
};
