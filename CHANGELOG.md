# Changelog

All notable changes to the Fable Admin API will be documented in this file.

## [1.0.0] - 2025-05-22

### Added
- Initial project setup with NestJS framework
- Database connection with PostgreSQL
- Authentication system with JWT
- User management with admin users
- University management (CRUD operations)
- Course management (CRUD operations)
- Event management (CRUD operations)
- Relations between entities:
  - Universities have many Courses
  - Courses belong to Universities
  - Events can be associated with multiple Courses
- Database seeding script for initial admin user

### Security
- JWT authentication for all endpoints
- Password hashing with bcrypt
- Protected routes with Guards
