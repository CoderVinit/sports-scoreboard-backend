const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'team_id'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  jerseyNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'jersey_number'
  },
  role: {
    type: DataTypes.ENUM('batsman', 'bowler', 'all-rounder', 'wicket-keeper'),
    allowNull: false,
    defaultValue: 'batsman'
  },
  battingStyle: {
    type: DataTypes.ENUM('right-hand', 'left-hand'),
    allowNull: true,
    field: 'batting_style'
  },
  bowlingStyle: {
    type: DataTypes.ENUM('right-arm-fast', 'left-arm-fast', 'right-arm-medium', 'left-arm-medium', 
                         'right-arm-off-spin', 'right-arm-leg-spin', 'left-arm-orthodox', 'left-arm-chinaman'),
    allowNull: true,
    field: 'bowling_style'
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'date_of_birth'
  },
  nationality: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  // Career statistics
  matchesPlayed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'matches_played'
  },
  totalRuns: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_runs'
  },
  highestScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'highest_score'
  },
  totalWickets: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_wickets'
  },
  bestBowling: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'best_bowling',
    comment: 'e.g., 5/20'
  },
  battingAverage: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0,
    field: 'batting_average'
  },
  bowlingAverage: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0,
    field: 'bowling_average'
  },
  strikeRate: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0,
    field: 'strike_rate'
  },
  economyRate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    field: 'economy_rate'
  },
  centuries: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  halfCenturies: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'half_centuries'
  },
  sixes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  fours: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  catches: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stumpings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  isCaptain: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_captain'
  },
  isViceCaptain: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_vice_captain'
  }
}, {
  tableName: 'players',
  timestamps: true,
  underscored: true
});

module.exports = Player;
