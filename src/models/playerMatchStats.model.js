const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlayerMatchStats = sequelize.define('PlayerMatchStats', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'match_id'
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'player_id'
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'team_id'
  },
  inningsId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'innings_id'
  },
  // Batting stats
  runsScored: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'runs_scored'
  },
  ballsFaced: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'balls_faced'
  },
  fours: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sixes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  strikeRate: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0,
    field: 'strike_rate'
  },
  isOut: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_out'
  },
  dismissalType: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'dismissal_type'
  },
  // Bowling stats
  oversBowled: {
    type: DataTypes.DECIMAL(4, 1),
    defaultValue: 0,
    field: 'overs_bowled'
  },
  runsConceded: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'runs_conceded'
  },
  wicketsTaken: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'wickets_taken'
  },
  maidenOvers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'maiden_overs'
  },
  economyRate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    field: 'economy_rate'
  },
  dotBalls: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'dot_balls'
  },
  wides: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  noBalls: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'no_balls'
  },
  // Fielding stats
  catches: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  runOuts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'run_outs'
  },
  stumpings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isPlaying: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_playing'
  },
  battingPosition: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'batting_position'
  }
}, {
  tableName: 'player_match_stats',
  timestamps: true,
  underscored: true
});

module.exports = PlayerMatchStats;
