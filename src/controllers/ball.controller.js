const { Ball, Innings, Player } = require('../models');

// Record a ball
exports.recordBall = async (req, res) => {
  try {
    const ball = await Ball.create(req.body);
    
    // Update innings statistics
    const innings = await Innings.findByPk(ball.inningsId);
    if (innings) {
      const totalRuns = ball.runs + ball.extras;
      innings.totalRuns += totalRuns;
      
      if (ball.extraType === 'wide' || ball.extraType === 'no_ball') {
        innings[ball.extraType === 'wide' ? 'wides' : 'noBalls'] += ball.extras;
      } else if (ball.extraType === 'bye') {
        innings.byes += ball.extras;
      } else if (ball.extraType === 'leg_bye') {
        innings.legByes += ball.extras;
      }
      
      innings.extras += ball.extras;
      
      if (ball.isWicket) {
        innings.totalWickets += 1;
      }
      
      // Update overs (only if it's not a wide or no ball)
      if (ball.extraType !== 'wide' && ball.extraType !== 'no_ball') {
        const currentOvers = Math.floor(innings.totalOvers);
        const currentBalls = Math.round((innings.totalOvers - currentOvers) * 10);
        
        if (currentBalls === 5) {
          innings.totalOvers = currentOvers + 1;
        } else {
          innings.totalOvers = currentOvers + (currentBalls + 1) / 10;
        }
      }
      
      // Calculate run rate
      if (innings.totalOvers > 0) {
        innings.runRate = innings.totalRuns / innings.totalOvers;
      }
      
      await innings.save();
    }
    
    res.status(201).json({
      success: true,
      data: ball
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error recording ball',
      error: error.message
    });
  }
};

// Get balls for an over
exports.getOver = async (req, res) => {
  try {
    const { inningsId, overNumber } = req.params;
    
    const balls = await Ball.findAll({
      where: {
        inningsId: inningsId,
        overNumber: overNumber
      },
      include: [
        { model: Player, as: 'batsman', attributes: ['id', 'name'] },
        { model: Player, as: 'bowler', attributes: ['id', 'name'] }
      ],
      order: [['ballNumber', 'ASC']]
    });

    res.json({
      success: true,
      count: balls.length,
      data: balls
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching over',
      error: error.message
    });
  }
};

// Get recent balls
exports.getRecentBalls = async (req, res) => {
  try {
    const { inningsId } = req.params;
    const limit = parseInt(req.query.limit) || 6;
    
    const balls = await Ball.findAll({
      where: { inningsId },
      include: [
        { model: Player, as: 'batsman', attributes: ['id', 'name'] },
        { model: Player, as: 'bowler', attributes: ['id', 'name'] }
      ],
      order: [['id', 'DESC']],
      limit
    });

    res.json({
      success: true,
      data: balls.reverse()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent balls',
      error: error.message
    });
  }
};
