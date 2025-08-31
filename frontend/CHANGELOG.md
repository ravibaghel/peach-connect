# Changelog

## 2025-08-31

### Added
- Student profile feature (backend and frontend)
  - Domain model: `Student.java`
  - Repository: `StudentRepository.java`
  - Service: `StudentService.java`
  - REST Controller: `StudentController.java`
  - Frontend UI: `StudentProfiles.jsx`
  - API functions for student CRUD in `api.js`
- Role-based access for student profiles:
  - Admin: view all students, filter by grade, add/edit/delete
  - Teacher: view/manage students they teach (demo: filtered by grade)
  - Parent: view only their children
- Integrated student profile management into main dashboard (`App.jsx`)
- JWT parsing and role extraction in frontend for access control
- Backend unit tests for student service (`StudentServiceTest.java`)
- Committed all changes to git in both backend and frontend folders

### Improved
- Main dashboard UI to include student profile management
- API and frontend logic for CRUD operations and filtering

### Documentation
- This changelog summarizes all major changes and integrations for the student profile feature and role-based access.
