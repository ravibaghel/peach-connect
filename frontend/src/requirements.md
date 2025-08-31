# MVP Requirements for Peach Connect

## Features
- User roles (parent, teacher, admin)
- JWT authentication
- Messaging (send/receive)
- Notifications
- Student profiles
- Event calendar

## Tech Stack
- Backend: Java 21 + Spring Boot (Maven)
- Frontend: React + Tailwind CSS
- Database: PostgreSQL

## Architecture
- Onion architecture
- Domain Driven Design
- Git-style folder structure

## API Endpoints
- `/api/messages` (GET, POST)
- `/api/notifications` (GET, POST)
- `/api/students` (GET, POST)
- `/api/events` (GET, POST)
- `/api/auth` (login, register)

## Frontend Pages
- Login/Register
- Dashboard (messages, notifications)
- Student profile view
- Event calendar

## Security
- JWT-based authentication
- Role-based access control

## Documentation
- Setup instructions in `docs/`
- API usage examples
- Architecture overview
