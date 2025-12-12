const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  matchNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'match_number'
  },
  team1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'team1_id'
  },
  team2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'team2_id'
  },
  matchFormat: {
    type: DataTypes.ENUM('T20', 'ODI', 'Test', 'T10', 'The Hundred'),
    allowNull: false,
    defaultValue: 'T20',
    field: 'match_format'
  },
  totalOvers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 20,
    field: 'total_overs',
    comment: 'Total overs per innings'
  },
  venue: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  matchDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'match_date'
  },
  tossWinnerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'toss_winner_id'
  },
  tossDecision: {
    type: DataTypes.ENUM('bat', 'bowl'),
    allowNull: true,
    field: 'toss_decision'
  },
  battingFirstId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'batting_first_id'
  },
  winnerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'winner_id'
  },
  winMargin: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'win_margin',
    comment: 'e.g., 5 wickets, 20 runs'
  },
  resultType: {
    type: DataTypes.ENUM('normal', 'tie', 'no_result', 'super_over'),
    defaultValue: 'normal',
    field: 'result_type'
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'live', 'innings_break', 'completed', 'cancelled', 'abandoned'),
    defaultValue: 'scheduled'
  },
  currentInnings: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: 'current_innings'
  },
  umpire1: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  umpire2: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  thirdUmpire: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'third_umpire'
  },
  referee: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  playerOfMatch: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'player_of_match'
  },
  season: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  series: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  isNightMatch: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_night_match'
  },
  weather: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  pitchReport: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'pitch_report'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'matches',
  timestamps: true,
  underscored: true
});

module.exports = Match;
