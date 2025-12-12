# Sports Scoreboard Backend API Documentation

Complete API documentation for the Cricket Scoreboard application.

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // Optional: "user" | "admin" | "moderator"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true
    },
    "token": "mock-token-1"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "mock-token-1"
  }
}
```

### Get User Profile
```http
GET /api/auth/profile/:userId
```

### Update Profile
```http
PUT /api/auth/profile/:userId
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com",
  "password": "newpassword"  // Optional
}
```

### Logout
```http
POST /api/auth/logout
```

---

## Match Endpoints

### Get All Matches
```http
GET /api/matches
Query Parameters:
  - status: "live" | "completed" | "scheduled" | "abandoned"
  - season: "2025"
  - sport: "Cricket"
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "matchNumber": "M001",
      "team1": {
        "id": 1,
        "name": "India U19",
        "shortName": "IND U19",
        "logo": "🇮🇳"
      },
      "team2": {
        "id": 2,
        "name": "UAE U19",
        "shortName": "UAE U19",
        "logo": "🇦🇪"
      },
      "matchFormat": "T20",
      "venue": "ICCA Dubai",
      "matchDate": "2025-12-12",
      "status": "live"
    }
  ]
}
```

### Get Live Matches
```http
GET /api/matches/live
```

### Get Upcoming Matches
```http
GET /api/matches/upcoming
```

### Get Match Details
```http
GET /api/matches/:id
```

**Response includes:**
- Full match details
- Team information
- Innings details
- Player stats
- Ball-by-ball data

### Get Match Scorecard
```http
GET /api/matches/:id/scorecard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "team1": {...},
    "team2": {...},
    "innings": [
      {
        "id": 1,
        "runs": 392,
        "wickets": 5,
        "overs": 46.5,
        "battingTeam": {...},
        "bowlingTeam": {...}
      }
    ],
    "playerStats": [...]
  }
}
```

### Get Match Statistics
```http
GET /api/matches/:id/statistics
```

**Returns:**
- Batting statistics
- Bowling statistics
- Partnerships
- Fall of wickets

### Get Match Commentary
```http
GET /api/matches/:id/commentary
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "over": "46.6",
      "text": "Yug Sharma to Kanishk Chouhan, 4 run(s)",
      "runs": 4,
      "isWicket": false,
      "extras": 0
    }
  ]
}
```

### Create Match
```http
POST /api/matches
Content-Type: application/json

{
  "matchNumber": "M001",
  "team1Id": 1,
  "team2Id": 2,
  "matchFormat": "T20",
  "totalOvers": 20,
  "venue": "ICCA Dubai",
  "city": "Dubai",
  "matchDate": "2025-12-12",
  "tossWinnerId": 1,
  "tossDecision": "bat",
  "status": "scheduled"
}
```

### Update Match
```http
PUT /api/matches/:id
Content-Type: application/json

{
  "status": "live",
  "winnerId": 1,
  "result": "India U19 won by 50 runs"
}
```

### Delete Match
```http
DELETE /api/matches/:id
```

---

## Team Endpoints

### Get All Teams
```http
GET /api/teams
```

### Get Team by ID
```http
GET /api/teams/:id
```

### Get Team Players
```http
GET /api/teams/:id/players
```

### Create Team
```http
POST /api/teams
Content-Type: application/json

{
  "name": "India U19",
  "shortName": "IND U19",
  "logo": "🇮🇳",
  "country": "India",
  "coach": "Rahul Dravid"
}
```

### Update Team
```http
PUT /api/teams/:id
```

### Delete Team
```http
DELETE /api/teams/:id
```

---

## Player Endpoints

### Get All Players
```http
GET /api/players
Query Parameters:
  - teamId: number
  - role: "batsman" | "bowler" | "all-rounder" | "wicket-keeper"
```

### Get Player by ID
```http
GET /api/players/:id
```

### Get Player Statistics
```http
GET /api/players/:id/stats
```

### Create Player
```http
POST /api/players
Content-Type: application/json

{
  "name": "Kanishk Chouhan",
  "teamId": 1,
  "role": "batsman",
  "battingStyle": "right-hand",
  "bowlingStyle": "right-arm medium",
  "jerseyNumber": 10,
  "dateOfBirth": "2006-05-15"
}
```

### Update Player
```http
PUT /api/players/:id
```

### Delete Player
```http
DELETE /api/players/:id
```

---

## Innings Endpoints

### Get Innings by ID
```http
GET /api/innings/:id
```

### Get Innings with Balls
```http
GET /api/innings/:id/balls
```

### Create Innings
```http
POST /api/innings
Content-Type: application/json

{
  "matchId": 1,
  "inningsNumber": 1,
  "battingTeamId": 1,
  "bowlingTeamId": 2
}
```

### Update Innings
```http
PUT /api/innings/:id
Content-Type: application/json

{
  "runs": 392,
  "wickets": 5,
  "overs": 46.5
}
```

---

## Ball Endpoints

### Get All Balls for Innings
```http
GET /api/balls?inningsId=1
```

### Record Ball
```http
POST /api/balls
Content-Type: application/json

{
  "inningsId": 1,
  "ballNumber": 281,
  "overId": 46,
  "batsmanId": 1,
  "bowlerId": 8,
  "runs": 4,
  "extras": 0,
  "extraType": null,
  "isWicket": false,
  "wicketType": null,
  "fielderIds": []
}
```

### Update Ball
```http
PUT /api/balls/:id
```

### Delete Ball
```http
DELETE /api/balls/:id
```

---

## User Management Endpoints (Admin)

### Get All Users
```http
GET /api/users
```

### Get User by ID
```http
GET /api/users/:id
```

### Create User
```http
POST /api/users
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

### Update User
```http
PUT /api/users/:id
```

### Delete User
```http
DELETE /api/users/:id
```

---

## Health Check

### Server Health
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### Common HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## Database Setup Commands

```bash
# Run migrations
npm run db:migrate

# Run seeders
npm run db:seed

# Reset database (migrations + seeds)
npm run db:reset

# Undo migrations
npm run db:migrate:undo:all

# Undo seeders
npm run db:seed:undo:all
```

---

## Environment Variables

Create `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sports_scoreboard
DB_DIALECT=mysql
NODE_ENV=development
```

---

## Running the Server

```bash
# Install dependencies
npm install

# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

---

## Frontend Integration

### Example Axios Setup

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Usage Examples

```javascript
// Login
const { data } = await api.post('/auth/login', {
  username: 'admin',
  password: 'admin123'
});

// Get live matches
const liveMatches = await api.get('/matches/live');

// Get match details
const matchDetails = await api.get(`/matches/${matchId}`);

// Record a ball
await api.post('/balls', {
  inningsId: 1,
  ballNumber: 281,
  batsmanId: 1,
  bowlerId: 8,
  runs: 4
});
```

---

## Notes

- All timestamps are in ISO 8601 format
- The API uses JWT tokens for authentication (implement in production)
- CORS is enabled for cross-origin requests
- All routes are prefixed with `/api`
- Match formats: T20, ODI, Test, T10, The Hundred
- Match statuses: scheduled, live, completed, abandoned
- Player roles: batsman, bowler, all-rounder, wicket-keeper
