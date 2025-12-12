const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Innings = sequelize.define('Innings', {
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
  battingTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'batting_team_id'
  },
  bowlingTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'bowling_team_id'
  },
  inningsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'innings_number',
    comment: '1 for first innings, 2 for second'
  },
  totalRuns: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_runs'
  },
  totalWickets: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_wickets'
  },
  totalOvers: {
    type: DataTypes.DECIMAL(5, 1),
    defaultValue: 0,
    field: 'total_overs',
    comment: 'e.g., 19.4 overs'
  },
  extras: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  byes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  legByes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'leg_byes'
  },
  penalties: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  runRate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    field: 'run_rate'
  },
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed', 'declared'),
    defaultValue: 'not_started'
  },
  isDeclared: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_declared'
  },
  isFollowOn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_follow_on'
  },
  target: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Target runs for second innings'
  },
  requiredRunRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'required_run_rate'
  }
}, {
  tableName: 'innings',
  timestamps: true,
  underscored: true
});

module.exports = Innings;
