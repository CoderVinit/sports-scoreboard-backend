const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partnership = sequelize.define('Partnership', {
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
  batsman1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'batsman1_id'
  },
  batsman2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'batsman2_id'
  },
  wicketNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'wicket_number',
    comment: '1st wicket, 2nd wicket, etc.'
  },
  runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  balls: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  batsman1Runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'batsman1_runs'
  },
  batsman2Runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'batsman2_runs'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'partnerships',
  timestamps: true,
  underscored: true
});

module.exports = Partnership;
