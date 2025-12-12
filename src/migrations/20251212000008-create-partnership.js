'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partnerships', {
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
      batsman1_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      batsman2_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      wicket_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      runs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      balls: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      batsman1_runs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      batsman2_runs: {
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
    await queryInterface.addIndex('partnerships', ['match_id']);
    await queryInterface.addIndex('partnerships', ['innings_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('partnerships');
  }
};
