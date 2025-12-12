'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('innings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      match_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'matches',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      batting_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      bowling_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      innings_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_runs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_wickets: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_overs: {
        type: Sequelize.DECIMAL(5, 1),
        defaultValue: 0
      },
      extras: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      wides: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      no_balls: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      byes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      leg_byes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      penalties: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      run_rate: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('not_started', 'in_progress', 'completed', 'declared'),
        defaultValue: 'not_started'
      },
      is_declared: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_follow_on: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      target: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      required_run_rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
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
    await queryInterface.addIndex('innings', ['match_id']);
    await queryInterface.addIndex('innings', ['batting_team_id']);
    await queryInterface.addIndex('innings', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('innings');
  }
};
