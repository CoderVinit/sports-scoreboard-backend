const sequelize = require('../config/database');
const User = require('./user.model');
const Team = require('./team.model');
const Match = require('./match.model');
const Player = require('./player.model');
const Innings = require('./innings.model');
const Ball = require('./ball.model');
const PlayerMatchStats = require('./playerMatchStats.model');
const Partnership = require('./partnership.model');

// Define relationships

// Team relationships
Team.hasMany(Player, { foreignKey: 'team_id', as: 'players' });
Player.belongsTo(Team, { foreignKey: 'team_id', as: 'team' });

// Match relationships
Match.belongsTo(Team, { foreignKey: 'team1_id', as: 'team1' });
Match.belongsTo(Team, { foreignKey: 'team2_id', as: 'team2' });
Match.belongsTo(Team, { foreignKey: 'toss_winner_id', as: 'tossWinner' });
Match.belongsTo(Team, { foreignKey: 'batting_first_id', as: 'battingFirst' });
Match.belongsTo(Team, { foreignKey: 'winner_id', as: 'winner' });
Match.belongsTo(Player, { foreignKey: 'playerOfMatchId', as: 'playerOfMatch' });

// Innings relationships
Match.hasMany(Innings, { foreignKey: 'match_id', as: 'innings' });
Innings.belongsTo(Match, { foreignKey: 'match_id', as: 'match' });
Innings.belongsTo(Team, { foreignKey: 'batting_team_id', as: 'battingTeam' });
Innings.belongsTo(Team, { foreignKey: 'bowling_team_id', as: 'bowlingTeam' });

// Ball relationships
Ball.belongsTo(Match, { foreignKey: 'match_id', as: 'match' });
Ball.belongsTo(Innings, { foreignKey: 'innings_id', as: 'innings' });
Ball.belongsTo(Player, { foreignKey: 'batsman_id', as: 'batsman' });
Ball.belongsTo(Player, { foreignKey: 'non_striker_id', as: 'nonStriker' });
Ball.belongsTo(Player, { foreignKey: 'bowler_id', as: 'bowler' });
Ball.belongsTo(Player, { foreignKey: 'dismissed_player_id', as: 'dismissedPlayer' });
Ball.belongsTo(Player, { foreignKey: 'fielder_id', as: 'fielder' });
Innings.hasMany(Ball, { foreignKey: 'innings_id', as: 'balls' });

// PlayerMatchStats relationships
PlayerMatchStats.belongsTo(Match, { foreignKey: 'match_id', as: 'match' });
PlayerMatchStats.belongsTo(Player, { foreignKey: 'player_id', as: 'player' });
PlayerMatchStats.belongsTo(Team, { foreignKey: 'team_id', as: 'team' });
PlayerMatchStats.belongsTo(Innings, { foreignKey: 'innings_id', as: 'innings' });
Match.hasMany(PlayerMatchStats, { foreignKey: 'match_id', as: 'playerStats' });
Player.hasMany(PlayerMatchStats, { foreignKey: 'player_id', as: 'matchStats' });

// Partnership relationships
Partnership.belongsTo(Match, { foreignKey: 'match_id', as: 'match' });
Partnership.belongsTo(Innings, { foreignKey: 'innings_id', as: 'innings' });
Partnership.belongsTo(Player, { foreignKey: 'batsman1_id', as: 'batsman1' });
Partnership.belongsTo(Player, { foreignKey: 'batsman2_id', as: 'batsman2' });
Match.hasMany(Partnership, { foreignKey: 'match_id', as: 'partnerships' });
Innings.hasMany(Partnership, { foreignKey: 'innings_id', as: 'partnerships' });

const models = {
  User,
  Team,
  Match,
  Player,
  Innings,
  Ball,
  PlayerMatchStats,
  Partnership,
  sequelize
};

module.exports = models;
