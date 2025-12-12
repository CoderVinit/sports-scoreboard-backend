# Sports Scoreboard Backend

A Node.js backend application for managing sports scoreboards, built with Express.js, MySQL, and Sequelize ORM.

## Features

- RESTful API architecture
- MySQL database with Sequelize ORM
- User management
- Team management
- Match tracking
- CORS enabled
- Environment-based configuration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Environment Variables**: dotenv

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/CoderVinit/sports-scoreboard-backend.git
cd sports-scoreboard-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MySQL credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sports_scoreboard
```

5. Create the MySQL database:
```sql
CREATE DATABASE sports_scoreboard;
```

6. Run migrations to create tables:
```bash
npm run db:migrate
```

7. (Optional) Seed the database with sample data:
```bash
npm run db:seed
```

## Running the Application

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create a new team
- `PUT /api/teams/:id` - Update a team
- `DELETE /api/teams/:id` - Delete a team

## Project Structure

```
sports-scoreboard-backend/
├── src/
│   ├── config/
│   │   ├── database.js       # Database connection
│   │   └── config.js         # Environment configurations
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── team.controller.js
│   ├── models/
│   │   ├── index.js          # Model associations
│   │   ├── user.model.js
│   │   ├── team.model.js
│   │   └── match.model.js
│   ├── routes/
│   │   ├── index.js          # Main router
│   │   ├── user.routes.js
│   │   └── team.routes.js
│   ├── migrations/           # Database migrations
│   │   ├── 20251212000001-create-user.js
│   │   ├── 20251212000002-create-team.js
│   │   └── 20251212000003-create-match.js
│   ├── seeders/              # Database seeders
│   │   ├── 20251212000001-demo-users.js
│   │   └── 20251212000002-demo-teams.js
│   └── server.js             # Application entry point
├── .env                       # Environment variables (not in git)
├── .env.example              # Example environment file
├── .sequelizerc              # Sequelize CLI configuration
├── .gitignore
├── package.json
└── README.md
```

## Database Models

### User
- id (Primary Key)
- username (unique)
- email (unique)
- password
- role (admin, user, moderator)
- isActive
- timestamps (createdAt, updatedAt)

### Team
- id (Primary Key)
- name
- sport
- logo
- description
- timestamps (createdAt, updatedAt)

### Match
- id (Primary Key)
- homeTeamId
- awayTeamId
- homeScore
- awayScore
- status (scheduled, live, completed, cancelled)
- matchDate
- venue
- timestamps (createdAt, updatedAt)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
### Sequelize CLI Commands

The application uses Sequelize ORM with migrations and seeders:

**Migrations:**
- `npm run db:migrate` - Run all pending migrations
- `npm run db:migrate:undo` - Undo the last migration
- `npm run db:migrate:undo:all` - Undo all migrations
- `npm run migration:generate -- name-of-migration` - Generate a new migration file

**Seeders:**
- `npm run db:seed` - Run all seeders
- `npm run db:seed:undo` - Undo all seeders
- `npm run seed:generate -- name-of-seeder` - Generate a new seeder file

**Database Reset:**
- `npm run db:reset` - Reset database (undo all migrations, run migrations, run seeders)

### Features

The application uses Sequelize ORM with the following features:
- Automatic table creation/synchronization
- Model validation
- Relationships between models
- Query logging in development mode
- Migration-based schema management
- Database seeding for development/testingscoreboard |

## Development

The application uses Sequelize ORM with the following features:
- Automatic table creation/synchronization
- Model validation
- Relationships between models
- Query logging in development mode

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Author

CoderVinit
