const { Innings, Match, Team, Ball, PlayerMatchStats } = require('../models');

// Create innings
exports.createInnings = async (req, res) => {
  try {
    const innings = await Innings.create(req.body);
    res.status(201).json({
      success: true,
      data: innings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating innings',
      error: error.message
    });
  }
};

// Get innings details
exports.getInningsById = async (req, res) => {
  try {
    const innings = await Innings.findByPk(req.params.id, {
      include: [
        { model: Match, as: 'match' },
        { model: Team, as: 'battingTeam' },
        { model: Team, as: 'bowlingTeam' },
        {
          model: Ball,
          as: 'balls',
          order: [['overNumber', 'ASC'], ['ballNumber', 'ASC']]
        }
      ]
    });

    if (!innings) {
      return res.status(404).json({
        success: false,
        message: 'Innings not found'
      });
    }

    res.json({
      success: true,
      data: innings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching innings',
      error: error.message
    });
  }
};

// Update innings
exports.updateInnings = async (req, res) => {
  try {
    const innings = await Innings.findByPk(req.params.id);
    
    if (!innings) {
      return res.status(404).json({
        success: false,
        message: 'Innings not found'
      });
    }

    await innings.update(req.body);
    res.json({
      success: true,
      data: innings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating innings',
      error: error.message
    });
  }
};

// Get match innings
exports.getMatchInnings = async (req, res) => {
  try {
    const innings = await Innings.findAll({
      where: { matchId: req.params.matchId },
      include: [
        { model: Team, as: 'battingTeam' },
        { model: Team, as: 'bowlingTeam' }
      ],
      order: [['inningsNumber', 'ASC']]
    });

    res.json({
      success: true,
      count: innings.length,
      data: innings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching innings',
      error: error.message
    });
  }
};
