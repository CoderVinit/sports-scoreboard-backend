'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('player_match_stats', {
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
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      innings_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'innings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      runs_scored: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      balls_faced: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      fours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sixes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      strike_rate: {
        type: Sequelize.DECIMAL(6, 2),
        defaultValue: 0
      },
      is_out: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dismissal_type: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      overs_bowled: {
        type: Sequelize.DECIMAL(4, 1),
        defaultValue: 0
      },
      runs_conceded: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      wickets_taken: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      maiden_overs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      economy_rate: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0
      },
      dot_balls: {
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
      catches: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      run_outs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      stumpings: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      is_playing: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      batting_position: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addIndex('player_match_stats', ['match_id']);
    await queryInterface.addIndex('player_match_stats', ['player_id']);
    await queryInterface.addIndex('player_match_stats', ['team_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('player_match_stats');
  }
};
