# Peach Connect

School-Parent Communication Platform

## License

This project is licensed under the MIT License. **Attribution is required:** You must give appropriate credit by mentioning the original author: [@ravibaghel](https://github.com/ravibaghel) in any derivative work or distribution.

## Monorepo Structure

- [`backend/`](./backend) – Java 21 + Spring Boot API (Maven)
- [`frontend/`](./frontend) – React + Tailwind CSS app
- [`docs/`](./docs) – Documentation and requirements

## Quick Start

### Prerequisites
- Java 21 & Maven (for backend)
- Node.js & npm (for frontend and root scripts)
- PostgreSQL (for backend database)

### Configuration (Important!)
- **Backend:**
  - Copy `backend/src/main/resources/application.properties.example` to `backend/src/main/resources/application.properties` and fill in your real database credentials and settings.
- **Frontend:**
  - If you need environment variables (e.g., API URLs), copy `frontend/.env.example` to `frontend/.env` and fill in your real values.

### Start Backend and Frontend
You can start each service from the root using npm scripts:
- **Backend:**
  ```sh
  npm run backend
  ```
- **Frontend:**
  ```sh
  npm run frontend
  ```

Or run them directly in their respective folders:
- **Backend:**
  ```sh
  cd backend && mvn spring-boot:run
  ```
- **Frontend:**
  ```sh
  cd frontend && npm run dev
  ```

Visit [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) for backend health check.

### Documentation
See [`docs/`](./docs) for requirements and additional documentation.

## Recommended VS Code Extensions
- Java Extension Pack
- Spring Boot Tools
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Markdown All in One

## Continuous Integration
CI/CD is configured via GitHub Actions in `.github/workflows/` (see below).

---
For detailed setup, see the [backend README](./backend/README.md) and [frontend README](./frontend/README.md)
