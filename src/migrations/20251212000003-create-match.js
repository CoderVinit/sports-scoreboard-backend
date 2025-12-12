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
      match_number: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      team1_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      team2_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      match_format: {
        type: Sequelize.ENUM('T20', 'ODI', 'Test', 'T10', 'The Hundred'),
        allowNull: false,
        defaultValue: 'T20'
      },
      total_overs: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 20
      },
      venue: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      match_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      toss_winner_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      toss_decision: {
        type: Sequelize.ENUM('bat', 'bowl'),
        allowNull: true
      },
      batting_first_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      winner_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      win_margin: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      result_type: {
        type: Sequelize.ENUM('normal', 'tie', 'no_result', 'super_over'),
        defaultValue: 'normal'
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'live', 'innings_break', 'completed', 'cancelled', 'abandoned'),
        defaultValue: 'scheduled'
      },
      current_innings: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      umpire1: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      umpire2: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      third_umpire: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      referee: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      player_of_match: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      season: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      series: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      is_night_match: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      weather: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      pitch_report: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('matches', ['team1_id']);
    await queryInterface.addIndex('matches', ['team2_id']);
    await queryInterface.addIndex('matches', ['status']);
    await queryInterface.addIndex('matches', ['match_date']);
    await queryInterface.addIndex('matches', ['season']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};
