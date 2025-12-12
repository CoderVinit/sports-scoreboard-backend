const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ball = sequelize.define('Ball', {
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
  inningsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'innings_id'
  },
  overNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'over_number'
  },
  ballNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ball_number',
    comment: '1-6 for normal balls'
  },
  batsmanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'batsman_id'
  },
  nonStrikerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'non_striker_id'
  },
  bowlerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'bowler_id'
  },
  runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Runs scored off bat'
  },
  extras: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Extra runs on this ball'
  },
  extraType: {
    type: DataTypes.ENUM('none', 'wide', 'no_ball', 'bye', 'leg_bye', 'penalty'),
    defaultValue: 'none',
    field: 'extra_type'
  },
  isWicket: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_wicket'
  },
  wicketType: {
    type: DataTypes.ENUM('bowled', 'caught', 'lbw', 'run_out', 'stumped', 'hit_wicket', 
                         'caught_and_bowled', 'hit_ball_twice', 'obstructing_field', 'timed_out', 'retired_hurt'),
    allowNull: true,
    field: 'wicket_type'
  },
  dismissedPlayerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'dismissed_player_id'
  },
  fielderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'fielder_id',
    comment: 'Fielder who took catch or did run out'
  },
  isBoundary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_boundary'
  },
  boundaryType: {
    type: DataTypes.ENUM('four', 'six'),
    allowNull: true,
    field: 'boundary_type'
  },
  shotType: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'shot_type',
    comment: 'e.g., drive, pull, cut, sweep'
  },
  isReview: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_review'
  },
  reviewOutcome: {
    type: DataTypes.ENUM('umpire_call', 'not_out', 'out'),
    allowNull: true,
    field: 'review_outcome'
  },
  commentary: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ballSpeed: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'ball_speed',
    comment: 'Speed in km/h'
  }
}, {
  tableName: 'balls',
  timestamps: true,
  underscored: true
});

module.exports = Ball;
