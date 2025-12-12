# Migration and Seeder Guide

This guide explains how to use migrations and seeders for the Sports Scoreboard Backend.

## Overview

Migrations create the database schema, while seeders populate the database with sample data for testing.

## Migrations Created

1. **20251212000001-create-user.js** - Users table with roles (admin, user, moderator, scorekeeper)
2. **20251212000002-create-team.js** - Teams table with cricket statistics
3. **20251212000003-create-match.js** - Matches table with match details, toss, officials
4. **20251212000004-create-player.js** - Players table with cricket stats and roles
5. **20251212000005-create-innings.js** - Innings table with runs, wickets, extras
6. **20251212000006-create-ball.js** - Ball-by-ball tracking
7. **20251212000007-create-player-match-stats.js** - Player performance per match
8. **20251212000008-create-partnership.js** - Batting partnerships

## Seeders Created

1. **20251212000001-demo-users.js** - 4 demo users (admin, scorekeeper, etc.)
2. **20251212000002-demo-teams.js** - 2 teams (Team Horizon, Royal Challengers)
3. **20251212000003-demo-players.js** - 11 players (6 for Team Horizon, 5 for Royal Challengers)
4. **20251212000004-demo-matches.js** - 3 matches (2 completed, 1 live)
5. **20251212000005-demo-innings-balls.js** - Innings, balls, stats, and partnerships

## Commands

### Run All Migrations
```bash
npm run migrate
```
This creates all database tables in the correct order.

### Undo Last Migration
```bash
npx sequelize-cli db:migrate:undo
```

### Undo All Migrations
```bash
npx sequelize-cli db:migrate:undo:all
```

### Run All Seeders
```bash
npm run seed
```
This populates the database with demo data.

### Undo All Seeders
```bash
npx sequelize-cli db:seed:undo:all
```

### Run Specific Seeder
```bash
npx sequelize-cli db:seed --seed 20251212000001-demo-users.js
```

## Complete Setup Process

### 1. First Time Setup
```bash
# Install dependencies
npm install

# Create database (MySQL)
mysql -u root -p
CREATE DATABASE sports_scoreboard_dev;
exit;

# Configure .env file
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run migrate

# Run seeders
npm run seed

# Start the server
npm run dev
```

### 2. Reset Database (Clean Slate)
```bash
# Undo all seeders
npx sequelize-cli db:seed:undo:all

# Undo all migrations
npx sequelize-cli db:migrate:undo:all

# Run migrations again
npm run migrate

# Run seeders again
npm run seed
```

## Demo Data Included

### Users (4 users)
- **Admin**: admin@teamhorizon.com (password: admin123)
- **Scorekeeper**: scorekeeper@teamhorizon.com (password: scorekeeper123)
- **Moderator**: moderator@teamhorizon.com (password: moderator123)
- **User**: user@example.com (password: user123)

### Teams (2 teams)
- **Team Horizon** (ID: 1) - Captain: Virat Kohli
- **Royal Challengers** (ID: 2) - Captain: AB de Villiers

### Players (11 players)
**Team Horizon (6 players):**
- Virat Kohli (Captain, Batsman)
- Rohit Sharma (Vice-Captain, Batsman)
- Jasprit Bumrah (Bowler)
- Rishabh Pant (Wicket-keeper)
- Ravindra Jadeja (All-rounder)
- Hardik Pandya (All-rounder)

**Royal Challengers (5 players):**
- AB de Villiers (Captain, Batsman)
- Glenn Maxwell (All-rounder)
- Yuzvendra Chahal (Bowler)
- Josh Hazlewood (Bowler)
- Dinesh Karthik (Wicket-keeper)

### Matches (3 matches)
1. **Match 1** - Team Horizon vs Royal Challengers (Completed)
   - Winner: Team Horizon by 15 runs
   - Team Horizon: 185/5 (20 overs)
   - Royal Challengers: 170/9 (20 overs)

2. **Match 2** - Royal Challengers vs Team Horizon (Completed)
   - Winner: Royal Challengers by 6 wickets
   - Team Horizon: 165/7 (20 overs)
   - Royal Challengers: 168/4 (18.4 overs)

3. **Match 3** - Team Horizon vs Royal Challengers (Live)
   - Royal Challengers: 78/2 (10.3 overs) - In progress

### Additional Data
- **Ball-by-ball records** - First over of Match 1 with commentary
- **Player match stats** - Batting and bowling statistics
- **Partnerships** - Batting partnerships for innings

## Testing the API

After running migrations and seeders, test the API:

```bash
# Get all teams
GET http://localhost:3000/api/teams

# Get Team Horizon details
GET http://localhost:3000/api/teams/1

# Get all players
GET http://localhost:3000/api/players

# Get Team Horizon players
GET http://localhost:3000/api/players/team/1

# Get all matches
GET http://localhost:3000/api/matches

# Get match scorecard
GET http://localhost:3000/api/matches/1/scorecard

# Get live match (Match 3)
GET http://localhost:3000/api/matches/3/scorecard
```

## Migration Order

Migrations must be run in this order due to foreign key dependencies:
1. Users (no dependencies)
2. Teams (no dependencies)
3. Matches (depends on Teams)
4. Players (depends on Teams)
5. Innings (depends on Matches, Teams)
6. Balls (depends on Matches, Innings, Players)
7. PlayerMatchStats (depends on Matches, Players, Teams, Innings)
8. Partnerships (depends on Matches, Innings, Players)

The Sequelize CLI automatically runs migrations in timestamp order.

## Seeder Order

Seeders must be run in this order:
1. Users
2. Teams
3. Players (depends on Teams)
4. Matches (depends on Teams)
5. Innings, Balls, Stats, Partnerships (depends on Matches, Players)

## Troubleshooting

### Migration Error: Table already exists
```bash
# Drop all tables and re-run migrations
npx sequelize-cli db:migrate:undo:all
npm run migrate
```

### Seeder Error: Foreign key constraint fails
```bash
# Ensure migrations are run first
npm run migrate

# Then run seeders
npm run seed
```

### Database Connection Error
- Check .env file for correct database credentials
- Ensure MySQL server is running
- Verify database exists: `CREATE DATABASE sports_scoreboard_dev;`

## Production Deployment

For production:
```bash
# Set NODE_ENV to production
NODE_ENV=production

# Run migrations only (don't run seeders in production)
npx sequelize-cli db:migrate --env production
```

## Notes

- Migrations create the schema structure
- Seeders are for **development/testing only**
- In production, use real data instead of seeders
- Always backup your database before running undo commands
- The demo passwords are hashed with bcrypt for security
