'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('teams', [
      {
        name: 'Manchester United',
        sport: 'Football',
        logo: 'https://example.com/mu-logo.png',
        description: 'English Premier League football club',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Real Madrid',
        sport: 'Football',
        logo: 'https://example.com/rm-logo.png',
        description: 'Spanish La Liga football club',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Los Angeles Lakers',
        sport: 'Basketball',
        logo: 'https://example.com/lal-logo.png',
        description: 'NBA basketball team',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mumbai Indians',
        sport: 'Cricket',
        logo: 'https://example.com/mi-logo.png',
        description: 'IPL cricket team',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teams', null, {});
  }
};
