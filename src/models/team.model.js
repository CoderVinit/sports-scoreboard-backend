const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  shortName: {
    type: DataTypes.STRING(10),
    allowNull: true,
    field: 'short_name',
    comment: 'e.g., MI, CSK, RCB'
  },
  sport: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'cricket'
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  captain: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  coach: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  homeGround: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'home_ground'
  },
  foundedYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'founded_year'
  },
  matchesPlayed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'matches_played'
  },
  matchesWon: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'matches_won'
  },
  matchesLost: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'matches_lost'
  },
  matchesTied: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'matches_tied'
  },
  noResult: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'no_result'
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  netRunRate: {
    type: DataTypes.DECIMAL(5, 3),
    defaultValue: 0,
    field: 'net_run_rate'
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
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'teams',
  timestamps: true,
  underscored: true
});

module.exports = Team;
