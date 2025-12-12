'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('teams', [
      {
        id: 1,
        name: 'Team Horizon',
        short_name: 'TH',
        sport: 'cricket',
        logo: 'https://example.com/team-horizon-logo.png',
        captain: 'Virat Kohli',
        coach: 'Rahul Dravid',
        home_ground: 'M. Chinnaswamy Stadium',
        founded_year: 2018,
        matches_played: 120,
        matches_won: 75,
        matches_lost: 40,
        matches_tied: 3,
        no_result: 2,
        points: 150,
        net_run_rate: 0.85,
        total_runs: 18500,
        total_wickets: 450,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Royal Challengers',
        short_name: 'RC',
        sport: 'cricket',
        logo: 'https://example.com/rc-logo.png',
        captain: 'AB de Villiers',
        coach: 'Gary Kirsten',
        home_ground: 'Wankhede Stadium',
        founded_year: 2016,
        matches_played: 115,
        matches_won: 70,
        matches_lost: 42,
        matches_tied: 2,
        no_result: 1,
        points: 140,
        net_run_rate: 0.72,
        total_runs: 17800,
        total_wickets: 420,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teams', null, {});
  }
};
