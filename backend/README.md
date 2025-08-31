# Backend

Java 21 + Spring Boot (Maven)

## Structure
- `src/main/java/com/peachconnect/` - Source code
- `src/main/resources/` - Config/resources
- `src/test/java/com/peachconnect/` - Tests

## Setup
- Requires Java 21, Maven, PostgreSQL
- **Configuration:**
  - Copy `src/main/resources/application.properties.example` to `src/main/resources/application.properties` and fill in your real database credentials and settings.

## Run
```
mvn spring-boot:run
```

## Health Check / Smoke Test
After starting the backend, verify it is running by visiting:

    http://localhost:8080/actuator/health

You should see a response like `{ "status": "UP" }` if the backend is healthy. This endpoint is unauthenticated and enabled for smoke testing via Spring Boot Actuator.
