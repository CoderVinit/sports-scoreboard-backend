'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      short_name: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      sport: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'cricket'
      },
      logo: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      captain: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      coach: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      home_ground: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      founded_year: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      matches_played: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      matches_won: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      matches_lost: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      matches_tied: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      no_result: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      net_run_rate: {
        type: Sequelize.DECIMAL(5, 3),
        defaultValue: 0
      },
      total_runs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_wickets: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.addIndex('teams', ['sport']);
    await queryInterface.addIndex('teams', ['name']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
