'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const matchDate1 = new Date('2024-01-15T19:30:00');
    const matchDate2 = new Date('2024-01-20T14:00:00');
    const matchDate3 = new Date('2024-01-25T19:30:00');

    await queryInterface.bulkInsert('matches', [
      {
        id: 1,
        match_number: 1,
        team1_id: 1,
        team2_id: 2,
        match_format: 'T20',
        total_overs: 20,
        venue: 'M. Chinnaswamy Stadium',
        city: 'Bangalore',
        match_date: matchDate1,
        toss_winner_id: 1,
        toss_decision: 'bat',
        batting_first_id: 1,
        winner_id: 1,
        win_margin: 15,
        result_type: 'normal',
        status: 'completed',
        current_innings: 2,
        umpire1: 'Nitin Menon',
        umpire2: 'KN Ananthapadmanabhan',
        third_umpire: 'Virender Sharma',
        referee: 'Javagal Srinath',
        player_of_match: 1,
        season: '2024',
        series: 'Team Horizon Premier League',
        is_night_match: true,
        weather: 'Clear sky',
        pitch_report: 'Good batting track, expect high scores',
        notes: 'Amazing match with great batting display',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        match_number: 2,
        team1_id: 2,
        team2_id: 1,
        match_format: 'T20',
        total_overs: 20,
        venue: 'Wankhede Stadium',
        city: 'Mumbai',
        match_date: matchDate2,
        toss_winner_id: 2,
        toss_decision: 'bowl',
        batting_first_id: 1,
        winner_id: 2,
        win_margin: 6,
        result_type: 'normal',
        status: 'completed',
        current_innings: 2,
        umpire1: 'Anil Chaudhary',
        umpire2: 'Nitin Menon',
        third_umpire: 'KN Ananthapadmanabhan',
        referee: 'Javagal Srinath',
        player_of_match: 7,
        season: '2024',
        series: 'Team Horizon Premier League',
        is_night_match: false,
        weather: 'Partly cloudy',
        pitch_report: 'Favorable for spinners in second innings',
        notes: 'Excellent chase by Royal Challengers',
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        match_number: 3,
        team1_id: 1,
        team2_id: 2,
        match_format: 'T20',
        total_overs: 20,
        venue: 'Eden Gardens',
        city: 'Kolkata',
        match_date: matchDate3,
        toss_winner_id: 1,
        toss_decision: 'bowl',
        batting_first_id: 2,
        status: 'live',
        current_innings: 1,
        umpire1: 'Virender Sharma',
        umpire2: 'Anil Chaudhary',
        third_umpire: 'Nitin Menon',
        referee: 'Javagal Srinath',
        season: '2024',
        series: 'Team Horizon Premier League',
        is_night_match: true,
        weather: 'Clear',
        pitch_report: 'Balanced pitch, good for both batsmen and bowlers',
        notes: 'Match in progress',
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('matches', null, {});
  }
};
