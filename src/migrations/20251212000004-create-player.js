'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      jersey_number: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM('batsman', 'bowler', 'all-rounder', 'wicket-keeper'),
        allowNull: false,
        defaultValue: 'batsman'
      },
      batting_style: {
        type: Sequelize.ENUM('right-hand', 'left-hand'),
        allowNull: true
      },
      bowling_style: {
        type: Sequelize.ENUM('right-arm-fast', 'left-arm-fast', 'right-arm-medium', 'left-arm-medium', 
                             'right-arm-off-spin', 'right-arm-leg-spin', 'left-arm-orthodox', 'left-arm-chinaman'),
        allowNull: true
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      nationality: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      photo: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      matches_played: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_runs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      highest_score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_wickets: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      best_bowling: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      batting_average: {
        type: Sequelize.DECIMAL(6, 2),
        defaultValue: 0
      },
      bowling_average: {
        type: Sequelize.DECIMAL(6, 2),
        defaultValue: 0
      },
      strike_rate: {
        type: Sequelize.DECIMAL(6, 2),
        defaultValue: 0
      },
      economy_rate: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0
      },
      centuries: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      half_centuries: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sixes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      fours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      catches: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      stumpings: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_captain: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_vice_captain: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add indexes
    await queryInterface.addIndex('players', ['team_id']);
    await queryInterface.addIndex('players', ['role']);
    await queryInterface.addIndex('players', ['name']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};
