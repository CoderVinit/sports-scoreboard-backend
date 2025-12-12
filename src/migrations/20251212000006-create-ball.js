'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('balls', {
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
      innings_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'innings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      over_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ball_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      batsman_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      non_striker_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      bowler_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      runs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      extras: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      extra_type: {
        type: Sequelize.ENUM('none', 'wide', 'no_ball', 'bye', 'leg_bye', 'penalty'),
        defaultValue: 'none'
      },
      is_wicket: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      wicket_type: {
        type: Sequelize.ENUM('bowled', 'caught', 'lbw', 'run_out', 'stumped', 'hit_wicket', 
                             'caught_and_bowled', 'hit_ball_twice', 'obstructing_field', 'timed_out', 'retired_hurt'),
        allowNull: true
      },
      dismissed_player_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      fielder_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      is_boundary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      boundary_type: {
        type: Sequelize.ENUM('four', 'six'),
        allowNull: true
      },
      shot_type: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      is_review: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      review_outcome: {
        type: Sequelize.ENUM('umpire_call', 'not_out', 'out'),
        allowNull: true
      },
      commentary: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ball_speed: {
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
    await queryInterface.addIndex('balls', ['innings_id']);
    await queryInterface.addIndex('balls', ['match_id']);
    await queryInterface.addIndex('balls', ['over_number']);
    await queryInterface.addIndex('balls', ['batsman_id']);
    await queryInterface.addIndex('balls', ['bowler_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('balls');
  }
};
