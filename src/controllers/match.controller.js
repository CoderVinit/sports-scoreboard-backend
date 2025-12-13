const { Match, Team, Player, Innings, Ball, PlayerMatchStats, Partnership } = require('../models');

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    // Check if both toss winner and toss decision are selected
    const hasToss = req.body.tossWinnerId && req.body.tossDecision && req.body.battingFirstId;
    
    // Determine initial status based on toss
    let initialStatus = 'scheduled';
    if (hasToss) {
      initialStatus = 'live';
    }
    
    // Create match with determined status
    const matchData = {
      ...req.body,
      status: initialStatus
    };
    
    const match = await Match.create(matchData);
    
    // If both toss winner and decision are selected, create first innings
    if (hasToss) {
      await Innings.create({
        matchId: match.id,
        battingTeamId: match.battingFirstId,
        bowlingTeamId: match.battingFirstId === match.team1Id ? match.team2Id : match.team1Id,
        inningsNumber: 1,
        status: 'in_progress'
      });

      await match.update({
        currentInnings: 1
      });
    }

    // Fetch match with innings
    const matchWithInnings = await Match.findByPk(match.id, {
      include: [
        { model: Team, as: 'team1' },
        { model: Team, as: 'team2' },
        { model: Innings, as: 'innings' }
      ]
    });

    res.status(201).json({
      success: true,
      data: matchWithInnings
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
                { model: Player, as: 'bowler' },
                {model: Player, as: 'fielder', attributes: ['name'] }
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
    const match = await Match.findByPk(req.params.id, {
      include: [{ model: Innings, as: 'innings' }]
    });
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    // Check if both toss winner and toss decision are being added
    const hasToss = req.body.tossWinnerId && req.body.tossDecision && req.body.battingFirstId;
    const previouslyHadToss = match.tossWinnerId && match.tossDecision && match.battingFirstId;
    
    // If both toss winner and decision are newly added and match was scheduled, create innings and make it live
    if (hasToss && !previouslyHadToss && match.status === 'scheduled') {
      // Create first innings if it doesn't exist
      const existingInnings = await Innings.findOne({
        where: { matchId: match.id, inningsNumber: 1 }
      });

      if (!existingInnings) {
        await Innings.create({
          matchId: match.id,
          battingTeamId: req.body.battingFirstId,
          bowlingTeamId: req.body.battingFirstId === match.team1Id ? match.team2Id : match.team1Id,
          inningsNumber: 1,
          status: 'in_progress'
        });
      }

      // Update match to live status
      await match.update({
        ...req.body,
        status: 'live',
        currentInnings: 1
      });
    } else {
      // Normal update
      await match.update(req.body);
    }

    // Fetch updated match with innings
    const updatedMatch = await Match.findByPk(match.id, {
      include: [
        { model: Team, as: 'team1' },
        { model: Team, as: 'team2' },
        { model: Innings, as: 'innings' }
      ]
    });
    
    res.json({
      success: true,
      data: updatedMatch
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

// Get match statistics
exports.getMatchStatistics = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: 'team1', attributes: ['id', 'name'] },
        { model: Team, as: 'team2', attributes: ['id', 'name'] },
        {
          model: Innings,
          as: 'innings'
        },
        {
          model: PlayerMatchStats,
          as: 'playerStats',
          include: [
            { 
              model: Player, 
              as: 'player',
              attributes: ['id', 'name', 'role', 'teamId']
            },
            {
              model: Team,
              as: 'team',
              attributes: ['id', 'name']
            }
          ]
        },
        {
          model: Partnership,
          as: 'partnerships',
          include: [
            { model: Player, as: 'batsman1', attributes: ['id', 'name'] },
            { model: Player, as: 'batsman2', attributes: ['id', 'name'] }
          ]
        }
      ]
    });

    console.log(match);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    // Get current innings to determine batting and bowling teams
    const currentInnings = match.innings?.[match.currentInnings - 1];
    const battingTeamId = currentInnings?.battingTeamId || match.battingFirstId;
    const bowlingTeamId = currentInnings?.bowlingTeamId || (battingTeamId === match.team1Id ? match.team2Id : match.team1Id);

    // Fetch dismissal details for each player from Ball table
    const battingStatsWithDismissal = await Promise.all(
      match.playerStats
        .filter(s => s.teamId === battingTeamId)
        .map(async (stat) => {
          if (stat.isOut) {
            // Find the ball where this player got dismissed
            const dismissalBall = await Ball.findOne({
              where: {
                matchId: req.params.id,
                inningsId: stat.inningsId,
                isWicket: true,
                batsmanId: stat.playerId
              },
              include: [
                { model: Player, as: 'bowler', attributes: ['id', 'name'] },
                { model: Player, as: 'fielder', attributes: ['id', 'name'] }
              ]
            });

            return {
              ...stat.toJSON(),
              dismissalBowler: dismissalBall?.bowler,
              dismissalFielder: dismissalBall?.fielder
            };
          }
          return stat.toJSON();
        })
    );

    // Calculate Fall of Wickets from PlayerMatchStats
    const fallOfWickets = match.playerStats
      .filter(stat => stat.teamId === battingTeamId && stat.isOut)
      .map((stat, index) => {
        // Get the innings at the time of dismissal
        const inningsAtDismissal = match.innings.find(inn => inn.id === stat.inningsId);
        
        return {
          wicket: index + 1,
          runs: stat.runsScored,
          player: stat.player,
          playerId: stat.playerId,
          playerName: stat.player?.name,
          // Calculate score when this wicket fell (approximate from total team runs)
          teamScore: inningsAtDismissal?.totalRuns || 0,
          over: stat.ballsFaced ? (stat.ballsFaced / 6).toFixed(1) : '0.0'
        };
      })
      .sort((a, b) => a.wicket - b.wicket);

    // Only show partnerships where total runs by the pair is 30 or more
    const filteredPartnerships = (match.partnerships || []).filter(p =>
      (p.runs || 0) >= 30
    );

    res.json({
      success: true,
      data: {
        playerStats: match.playerStats,
        battingStats: battingStatsWithDismissal,
        bowlingStats: match.playerStats.filter(s => s.teamId === bowlingTeamId && s.oversBowled > 0),
        partnerships: filteredPartnerships,
        fallOfWickets,
        battingTeamId,
        bowlingTeamId
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching match statistics',
      error: error.message
    });
  }
};

// Get live matches
exports.getLiveMatches = async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow
    
    const liveMatches = await Match.findAll({
      where: { 
        status: 'live',
        matchDate: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      },
      include: [
        { model: Team, as: 'team1', attributes: ['id', 'name', 'shortName', 'logo'] },
        { model: Team, as: 'team2', attributes: ['id', 'name', 'shortName', 'logo'] },
        {
          model: Innings,
          as: 'innings',
          include: [
            { model: Team, as: 'battingTeam', attributes: ['id', 'name', 'shortName'] },
            { model: Team, as: 'bowlingTeam', attributes: ['id', 'name', 'shortName'] }
          ]
        }
      ],
      order: [['matchDate', 'DESC']]
    });

    res.json({
      success: true,
      count: liveMatches.length,
      data: liveMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching live matches',
      error: error.message
    });
  }
};

// Get upcoming matches
exports.getUpcomingMatches = async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of today
    
    const upcomingMatches = await Match.findAll({
      where: { 
        status: 'scheduled',
        matchDate: {
          [Op.gte]: now  // Changed from tomorrow to today, so today's scheduled matches also show
        }
      },
      include: [
        { model: Team, as: 'team1', attributes: ['id', 'name', 'shortName', 'logo'] },
        { model: Team, as: 'team2', attributes: ['id', 'name', 'shortName', 'logo'] }
      ],
      order: [['matchDate', 'ASC']],
      limit: 10
    });

    res.json({
      success: true,
      count: upcomingMatches.length,
      data: upcomingMatches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming matches',
      error: error.message
    });
  }
};

// Get match commentary
exports.getMatchCommentary = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        {
          model: Innings,
          as: 'innings',
          include: [
            {
              model: Ball,
              as: 'balls',
              include: [
                { model: Player, as: 'batsman', attributes: ['id', 'name'] },
                { model: Player, as: 'bowler', attributes: ['id', 'name'] }
              ]
            }
          ]
        }
      ],
      order: [
        [{ model: Innings, as: 'innings' }, { model: Ball, as: 'balls' }, 'id', 'DESC']
      ]
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    // Generate commentary from balls
    const commentary = [];
    if (match.innings && match.innings.length > 0) {
      match.innings.forEach(innings => {
        if (innings.balls && innings.balls.length > 0) {
          innings.balls.forEach(ball => {
            const over = ball.overNumber || Math.floor(ball.ballNumber / 6);
            const ballInOver = ball.ballNumber || ((ball.ballNumber % 6) + 1);
            
            // Use custom commentary if available, otherwise generate default
            let commentaryText = ball.commentary;
            if (!commentaryText) {
              // Auto-generate commentary
              const runsText = ball.runs === 0 ? 'no run' : 
                              ball.runs === 1 ? '1 run' :
                              ball.runs === 4 ? 'FOUR!' :
                              ball.runs === 6 ? 'SIX!' :
                              `${ball.runs} runs`;
              
              const extrasText = ball.extras > 0 ? ` + ${ball.extras} extras` : '';
              const wicketText = ball.isWicket ? ` - WICKET! ${ball.wicketType || 'OUT'}` : '';
              
              commentaryText = `${ball.bowler?.name} to ${ball.batsman?.name}, ${runsText}${extrasText}${wicketText}`;
            }
            
            commentary.push({
              id: ball.id,
              over: `${over}.${ballInOver}`,
              overNumber: over,
              ballNumber: ballInOver,
              text: commentaryText,
              commentary: ball.commentary,
              runs: ball.runs,
              extras: ball.extras,
              isWicket: ball.isWicket,
              wicketType: ball.wicketType,
              batsman: ball.batsman?.name,
              bowler: ball.bowler?.name,
              timestamp: ball.createdAt
            });
          });
        }
      });
    }

    res.json({
      success: true,
      data: commentary.reverse() // Most recent first
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching commentary',
      error: error.message
    });
  }
};

