'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      away_team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      home_score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      away_score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'live', 'completed', 'cancelled'),
        defaultValue: 'scheduled'
      },
      match_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      venue: {
        type: Sequelize.STRING(255),
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
    await queryInterface.addIndex('matches', ['home_team_id']);
    await queryInterface.addIndex('matches', ['away_team_id']);
    await queryInterface.addIndex('matches', ['status']);
    await queryInterface.addIndex('matches', ['match_date']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};
