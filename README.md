# ProjectHub

AI-Powered Agile Project Management Platform

ProjectHub is a full-stack project management platform designed to help teams
manage projects, tasks, collaboration, and development workflows in one place.

## 🚧 Project Status

Currently under development.

### Completed

- Spring Boot backend
- PostgreSQL database
- Dockerized PostgreSQL
- Spring Data JPA + Hibernate
- User registration
- Input validation
- Duplicate email handling
- BCrypt password hashing
- User login
- JWT authentication
- JWT validation
- Role-based authorization
- USER / ADMIN roles
- Protected REST APIs

### Planned

- Project management
- Task management
- Task assignment
- Agile task statuses
- Comments and collaboration
- React frontend
- Tailwind CSS UI
- Kanban board
- AI-powered task generation
- AI project suggestions
- Automated testing
- CI/CD
- Cloud deployment

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST API

### Database
- PostgreSQL
- Docker

### Authentication
- BCrypt
- JWT

### Tools
- IntelliJ IDEA
- Postman
- Git
- GitHub

## Architecture

```text
Client
   ↓
REST API
   ↓
Spring Boot
   ↓
Spring Security + JWT
   ↓
Service Layer
   ↓
Spring Data JPA
   ↓
Hibernate
   ↓
PostgreSQL
