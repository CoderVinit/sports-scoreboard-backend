# 🏏 How to Insert Match Data - Team Horizon Cricket Scoreboard

## Data Insertion Order

Follow this sequence to insert cricket match data properly:

### 1️⃣ **Create Teams First**
```javascript
POST /api/teams
{
  "name": "Mumbai Indians",
  "shortName": "MI",
  "sport": "cricket",
  "captain": "Rohit Sharma",
  "coach": "Mahela Jayawardene",
  "homeGround": "Wankhede Stadium",
  "foundedYear": 2008
}
```

### 2️⃣ **Create Players for Each Team**
```javascript
POST /api/players
{
  "teamId": 1,
  "name": "Rohit Sharma",
  "jerseyNumber": 45,
  "role": "batsman",
  "battingStyle": "right-hand",
  "bowlingStyle": "right-arm-off-spin",
  "dateOfBirth": "1987-04-30",
  "nationality": "India",
  "isCaptain": true
}
```

### 3️⃣ **Create a Match**
```javascript
POST /api/matches
{
  "matchNumber": "Match 1",
  "team1Id": 1,
  "team2Id": 2,
  "matchFormat": "T20",
  "totalOvers": 20,
  "venue": "Wankhede Stadium",
  "city": "Mumbai",
  "matchDate": "2025-12-15T19:30:00Z",
  "season": "2025",
  "series": "IPL 2025",
  "isNightMatch": true
}
```

### 4️⃣ **Update Toss Details**
```javascript
PUT /api/matches/:matchId
{
  "tossWinnerId": 1,
  "tossDecision": "bat",
  "battingFirstId": 1,
  "status": "live"
}
```

### 5️⃣ **Create First Innings**
```javascript
POST /api/innings
{
  "matchId": 1,
  "battingTeamId": 1,
  "bowlingTeamId": 2,
  "inningsNumber": 1,
  "status": "in_progress"
}
```

### 6️⃣ **Record Each Ball**
```javascript
POST /api/balls
{
  "matchId": 1,
  "inningsId": 1,
  "overNumber": 1,
  "ballNumber": 1,
  "batsmanId": 5,
  "nonStrikerId": 6,
  "bowlerId": 15,
  "runs": 4,
  "extras": 0,
  "extraType": "none",
  "isWicket": false,
  "isBoundary": true,
  "boundaryType": "four",
  "shotType": "cover drive",
  "commentary": "Beautiful cover drive for FOUR!"
}
```

### Example: Recording a Wicket Ball
```javascript
POST /api/balls
{
  "matchId": 1,
  "inningsId": 1,
  "overNumber": 5,
  "ballNumber": 3,
  "batsmanId": 5,
  "nonStrikerId": 6,
  "bowlerId": 15,
  "runs": 0,
  "extras": 0,
  "extraType": "none",
  "isWicket": true,
  "wicketType": "caught",
  "dismissedPlayerId": 5,
  "fielderId": 18,
  "commentary": "OUT! Caught at mid-off!"
}
```

### Example: Wide Ball
```javascript
POST /api/balls
{
  "matchId": 1,
  "inningsId": 1,
  "overNumber": 3,
  "ballNumber": 2,
  "batsmanId": 5,
  "nonStrikerId": 6,
  "bowlerId": 15,
  "runs": 0,
  "extras": 1,
  "extraType": "wide",
  "isWicket": false,
  "commentary": "Wide down the leg side"
}
```

## 📊 Complete Match Flow Example

```javascript
// 1. Create Teams
const team1 = await Team.create({
  name: "Team Horizon",
  shortName: "TH",
  sport: "cricket",
  captain: "Virat Kohli"
});

const team2 = await Team.create({
  name: "Super Kings",
  shortName: "SK",
  sport: "cricket"
});

// 2. Create Players
const player1 = await Player.create({
  teamId: team1.id,
  name: "Virat Kohli",
  role: "batsman",
  isCaptain: true
});

// 3. Create Match
const match = await Match.create({
  team1Id: team1.id,
  team2Id: team2.id,
  matchFormat: "T20",
  totalOvers: 20,
  venue: "Wankhede Stadium",
  matchDate: new Date(),
  status: "scheduled"
});

// 4. Update Toss
await match.update({
  tossWinnerId: team1.id,
  tossDecision: "bat",
  battingFirstId: team1.id,
  status: "live"
});

// 5. Create Innings
const innings1 = await Innings.create({
  matchId: match.id,
  battingTeamId: team1.id,
  bowlingTeamId: team2.id,
  inningsNumber: 1,
  status: "in_progress"
});

// 6. Record Balls (this happens in real-time during match)
const ball1 = await Ball.create({
  matchId: match.id,
  inningsId: innings1.id,
  overNumber: 1,
  ballNumber: 1,
  batsmanId: player1.id,
  bowlerId: player2.id,
  runs: 4,
  isBoundary: true,
  boundaryType: "four"
});
```

## 🎯 Quick API Endpoints Reference

### Teams
- `POST /api/teams` - Create team
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team details

### Players
- `POST /api/players` - Create player
- `GET /api/players?teamId=1` - Get team players
- `GET /api/players/team/:teamId/squad` - Get full squad

### Matches
- `POST /api/matches` - Create match
- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get match details
- `GET /api/matches/:id/scorecard` - Get live scorecard
- `PUT /api/matches/:id` - Update match

### Innings
- `POST /api/innings` - Create innings
- `GET /api/innings/match/:matchId` - Get match innings
- `PUT /api/innings/:id` - Update innings

### Balls
- `POST /api/balls` - Record a ball
- `GET /api/balls/innings/:inningsId/recent` - Get recent balls
- `GET /api/balls/innings/:inningsId/over/:overNumber` - Get over details

## 💡 Important Notes

1. **Always create teams and players before creating matches**
2. **Match must exist before creating innings**
3. **Innings must exist before recording balls**
4. **Recording a ball automatically updates innings statistics**
5. **Team IDs and Player IDs must be valid foreign keys**

## 🔄 Auto-calculations

When you record a ball via `POST /api/balls`, the system automatically:
- ✅ Updates innings total runs
- ✅ Updates wickets count
- ✅ Calculates overs (handles 6-ball overs)
- ✅ Updates extras (wides, no-balls, byes, leg-byes)
- ✅ Calculates current run rate

You just need to send the ball details, and the backend handles all calculations!
