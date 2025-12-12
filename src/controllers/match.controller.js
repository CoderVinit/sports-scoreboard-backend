const { Match, Team, Player, Innings, Ball, PlayerMatchStats, Partnership } = require('../models');

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json({
      success: true,
      data: match
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating match',
      error: error.message
    });
  }
};

// Get match with full details
exports.getMatchDetails = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: 'team1' },
        { model: Team, as: 'team2' },
        { model: Team, as: 'tossWinner' },
        { model: Team, as: 'winner' },
        { model: Player, as: 'playerOfMatch' },
        {
          model: Innings,
          as: 'innings',
          include: [
            { model: Team, as: 'battingTeam' },
            { model: Team, as: 'bowlingTeam' },
            {
              model: Ball,
              as: 'balls',
              include: [
                { model: Player, as: 'batsman' },
                { model: Player, as: 'bowler' }
              ]
            }
          ]
        },
        {
          model: PlayerMatchStats,
          as: 'playerStats',
          include: [{ model: Player, as: 'player' }]
        }
      ]
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    res.json({
      success: true,
      data: match
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching match details',
      error: error.message
    });
  }
};

// Update match status
exports.updateMatchStatus = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    await match.update(req.body);
    
    res.json({
      success: true,
      data: match
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating match',
      error: error.message
    });
  }
};

// Get live match scorecard
exports.getLiveScorecard = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: 'team1', attributes: ['id', 'name', 'shortName', 'logo'] },
        { model: Team, as: 'team2', attributes: ['id', 'name', 'shortName', 'logo'] },
        {
          model: Innings,
          as: 'innings',
          include: [
            { model: Team, as: 'battingTeam' },
            { model: Team, as: 'bowlingTeam' }
          ]
        },
        {
          model: PlayerMatchStats,
          as: 'playerStats',
          include: [
            { 
              model: Player, 
              as: 'player',
              attributes: ['id', 'name', 'role', 'jerseyNumber']
            }
          ]
        }
      ]
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    res.json({
      success: true,
      data: match
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scorecard',
      error: error.message
    });
  }
};

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const { status, season, sport } = req.query;
    const where = {};
    
    if (status) where.status = status;
    if (season) where.season = season;
    if (sport) where.sport = sport;

    const matches = await Match.findAll({
      where,
      include: [
        { model: Team, as: 'team1', attributes: ['id', 'name', 'shortName', 'logo'] },
        { model: Team, as: 'team2', attributes: ['id', 'name', 'shortName', 'logo'] },
        { model: Team, as: 'winner', attributes: ['id', 'name', 'shortName'] }
      ],
      order: [['matchDate', 'DESC']]
    });

    res.json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching matches',
      error: error.message
    });
  }
};

// Delete match
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    await match.destroy();
    
    res.json({
      success: true,
      message: 'Match deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting match',
      error: error.message
    });
  }
};
