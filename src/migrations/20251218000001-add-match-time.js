'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('matches', 'match_time', {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: 'match_date'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('matches', 'match_time');
  }
};
