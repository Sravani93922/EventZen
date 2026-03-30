# EventZen
Full-stack event management system with React frontend, Node.js and Spring Boot backends, MongoDB and MySQL databases, fully Dockerised for easy deployment. Includes user authentication, role-based access, and admin dashboard.
# EventZen
Full-stack event management system with React frontend, Node.js and Spring Boot backends, MongoDB and MySQL databases, fully Dockerised for easy deployment. Includes user authentication, role-based access, and admin dashboard.
# EventZen

EventZen is a full-stack event management system with Dockerized backend and frontend. This project includes:

- **Backend (Node.js)** – User management, authentication (JWT), role-based access.
- **Backend (Spring Boot)** – Event handling and booking APIs.
- **Frontend (React)** – Dashboard, login, registration, and event management.
- **Database** – MongoDB for user storage, MySQL for event data.
- **Docker Compose** – Runs the full application stack.

---

## Table of Contents

1. [Project Structure](#project-structure)  
2. [Installation](#installation)  
3. [Dockerization](#dockerization)  
4. [Environment Variables](#environment-variables)  
5. [API Endpoints](#api-endpoints)  
6. [Known Issue](#known-issue)  
7. [Usage](#usage)  

---

## Project Structure
EventZen/ ├─ backend-node/         # Node.js backend (user auth)
           ├─ backend-spring/       # Spring Boot backend (event APIs)
           ├─ frontend-react/       # React frontend
           ├─ db/                   # Databases (MongoDB, MySQL)
           ├─ docker-compose.yml    # Compose file to run full stack
           ├─ .gitignore
           └─ README.md
        ---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Sravani93922/EventZen.git
cd EventZen
Make sure Docker is installed on your system.
Run Docker Compose:
Bash
docker-compose up --build
This will start all services: backend, frontend, and databases.
Dockerization
backend-node: Port 5000 (user APIs)
backend-spring: Port 8082 (event APIs)
frontend-react: Port 3000
MongoDB: Port 27017
MySQL: Port 3306
The services are fully containerized for easy setup.
Environment Variables
Create .env files for the backends:
Node backend (backend-node/.env):

## Environment Variables
Create .env files for the backends:
Node backend (backend-node/.env):
PORT=5000
MONGO_URI=mongodb://eventzen-mongo:27017/eventzen
JWT_SECRET=yourSuperSecretKey12345678901234567890
JWT_EXPIRE=1d


API Endpoints
User Authentication (Node.js backend)
Endpoint                             Method                    Body Parameters                    Description
/api/users/register                   POST                   name, email, password, role        Register new user (role optional)
/api/users/login                       POST                        email, password               Login user and return JWT token



Note: Login requires the email and password of a registered user.
Event APIs (Spring Boot backend)
/api/events – CRUD operations on events
/api/bookings – Booking events
(Frontend interacts with these via React dashboard.)
Known Issue
Registration from frontend is currently not working.
Registration works correctly via Postman, and the user is saved in MongoDB with a hashed password.
If needed, use Postman to create users for testing login and dashboard functionality.
Login works properly once a user exists. ⚠️⚠️ (Note:**email**: sravi9392@gmail.com ,  **password**:Sravani for #admin  &&  user **email**:test@gmail.com , **password**:test)


Usage
Start the stack:
   docker-compose up --build
   Frontend: Open http://localhost:3000⁠
   ⚠️⚠️Login: Use a registered user or create one via Postman
   ⚠️⚠️ Admin user: Use role admin to access admin dashboard
   Postman: You can test /api/users/register and /api/users/login endpoints directly


Additional Notes
        Make sure ports 5000, 3000, 8080, 27017, and 3306 are free.
        JWT secret and database credentials must match .env files.
        For full project review, registration can be bypassed by providing credentials or using Postman to register users.
License
This project is for academic purposes and not for commercial use.

This README clearly explains the project, Docker setup, endpoints, usage instructions, and the **register frontend issue** with guidance on using Postman.


