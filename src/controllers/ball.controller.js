const { Ball, Innings, Player, PlayerMatchStats, Partnership } = require('../models');

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

    // Update or create PlayerMatchStats for batsman
    if (ball.batsmanId && ball.matchId) {
      let batsmanStats = await PlayerMatchStats.findOne({
        where: {
          matchId: ball.matchId,
          playerId: ball.batsmanId
        }
      });

      if (!batsmanStats) {
        // Get batsman's team
        const batsman = await Player.findByPk(ball.batsmanId);
        batsmanStats = await PlayerMatchStats.create({
          matchId: ball.matchId,
          playerId: ball.batsmanId,
          teamId: batsman.teamId,
          inningsId: ball.inningsId,
          runsScored: 0,
          ballsFaced: 0,
          fours: 0,
          sixes: 0,
          isOut: false
        });
      }

      // Update batting stats (only count actual balls, not wides/no-balls)
      if (ball.extraType !== 'wide' && ball.extraType !== 'no_ball') {
        batsmanStats.ballsFaced += 1;
      }
      
      // Add runs (only if not bye/leg bye)
      if (ball.extraType !== 'bye' && ball.extraType !== 'leg_bye') {
        batsmanStats.runsScored += ball.runs;
        if (ball.runs === 4) batsmanStats.fours += 1;
        if (ball.runs === 6) batsmanStats.sixes += 1;
      }

      // Mark as out if wicket
      if (ball.isWicket) {
        batsmanStats.isOut = true;
        batsmanStats.dismissalType = ball.wicketType;
      }

      // Calculate strike rate
      if (batsmanStats.ballsFaced > 0) {
        batsmanStats.strikeRate = (batsmanStats.runsScored / batsmanStats.ballsFaced) * 100;
      }

      await batsmanStats.save();
    }

    // Update or create PlayerMatchStats for non-striker (so they appear in scorecard)
    if (ball.nonStrikerId && ball.matchId) {
      let nonStrikerStats = await PlayerMatchStats.findOne({
        where: {
          matchId: ball.matchId,
          playerId: ball.nonStrikerId
        }
      });

      if (!nonStrikerStats) {
        // Get non-striker's team
        const nonStriker = await Player.findByPk(ball.nonStrikerId);
        await PlayerMatchStats.create({
          matchId: ball.matchId,
          playerId: ball.nonStrikerId,
          teamId: nonStriker.teamId,
          inningsId: ball.inningsId,
          runsScored: 0,
          ballsFaced: 0,
          fours: 0,
          sixes: 0,
          isOut: false
        });
      }
      // Non-striker stats don't change unless they're involved in a run-out
    }

    // Update or create PlayerMatchStats for bowler
    if (ball.bowlerId && ball.matchId) {
      let bowlerStats = await PlayerMatchStats.findOne({
        where: {
          matchId: ball.matchId,
          playerId: ball.bowlerId
        }
      });

      if (!bowlerStats) {
        // Get bowler's team
        const bowler = await Player.findByPk(ball.bowlerId);
        bowlerStats = await PlayerMatchStats.create({
          matchId: ball.matchId,
          playerId: ball.bowlerId,
          teamId: bowler.teamId,
          inningsId: ball.inningsId,
          oversBowled: 0,
          runsConceded: 0,
          wicketsTaken: 0,
          maidenOvers: 0
        });
      }

      // Update bowling stats
      const totalRuns = ball.runs + ball.extras;
      bowlerStats.runsConceded += totalRuns;

      if (ball.isWicket && ball.dismissalType !== 'run_out') {
        bowlerStats.wicketsTaken += 1;
      }

      // Update overs bowled (only count valid deliveries)
      if (ball.extraType !== 'wide' && ball.extraType !== 'no_ball') {
        const currentOvers = Math.floor(bowlerStats.oversBowled);
        const currentBalls = Math.round((bowlerStats.oversBowled - currentOvers) * 10);
        
        if (currentBalls === 5) {
          bowlerStats.oversBowled = currentOvers + 1;
        } else {
          bowlerStats.oversBowled = currentOvers + (currentBalls + 1) / 10;
        }
      }

      // Calculate economy rate
      if (bowlerStats.oversBowled > 0) {
        bowlerStats.economyRate = bowlerStats.runsConceded / bowlerStats.oversBowled;
      }

      await bowlerStats.save();
    }

    // Track partnerships
    if (ball.batsmanId && ball.nonStrikerId && ball.matchId && ball.inningsId) {
      const innings = await Innings.findByPk(ball.inningsId);
      const currentWickets = innings.totalWickets;
      
      // Find or create current partnership
      let partnership = await Partnership.findOne({
        where: {
          matchId: ball.matchId,
          inningsId: ball.inningsId,
          wicketNumber: currentWickets
        }
      });

      if (!partnership) {
        partnership = await Partnership.create({
          matchId: ball.matchId,
          inningsId: ball.inningsId,
          batsman1Id: ball.batsmanId,
          batsman2Id: ball.nonStrikerId,
          wicketNumber: currentWickets,
          runs: 0,
          balls: 0,
          batsman1Runs: 0,
          batsman2Runs: 0
        });
      }

      // Update partnership
      if (ball.extraType !== 'wide' && ball.extraType !== 'no_ball') {
        partnership.balls += 1;
      }
      
      // Add runs to partnership (exclude byes and leg byes)
      if (ball.extraType !== 'bye' && ball.extraType !== 'leg_bye') {
        partnership.runs += ball.runs;
        
        // Update individual contributions
        if (partnership.batsman1Id === ball.batsmanId) {
          partnership.batsman1Runs += ball.runs;
        } else if (partnership.batsman2Id === ball.batsmanId) {
          partnership.batsman2Runs += ball.runs;
        }
      }

      await partnership.save();
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
