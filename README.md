# 🎫 Customer Ticket Portal

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![SpringBoot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

#Deployment Link : https://frontendservices-aywq.onrender.com

# 📖 Project Overview

Customer Ticket Portal is a Microservices-Based Support Management System developed using modern full-stack technologies.

The application allows users to create and track support tickets, managers to manage ticket workflows, and administrators to control user access and system operations.

The project follows a distributed architecture where all client requests pass through an API Gateway before reaching backend services.

---

# 🚀 Features

## 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Protected APIs
- Role-Based Access Control (RBAC)

## 👥 User Management

Admin-only Features:

- Create New Users
- Edit Existing Users
- Delete Users
- Assign User Roles
- View All Users

## 🎫 Ticket Management

### USER

- Create Tickets
- View Tickets
- Track Ticket Status

### MANAGER

- View All Tickets
- Update Ticket Information
- Change Ticket Status
- Delete Tickets

### ADMIN

- Full Ticket Control
- User Administration
- Ticket Administration
- Role Management

## 📊 Ticket Status Workflow

PENDING → IN_PROGRESS → COMPLETED

## 🍃 MongoDB Features

- Ticket Comments
- Ticket Activity Logs
- Resolution History
- Additional Ticket Metadata

---

# 🏗️ System Architecture

```text
React.js Frontend (5173)
            │
            ▼
FastAPI Gateway (8000)
            │
     ┌──────┴──────┐
     ▼             ▼

Spring Boot      Node.js
Backend          Service
(8002)           (9000)
     │             │
     ▼             ▼

PostgreSQL      MongoDB
(5432)          (27017)
```

---

# 💻 Technology Stack

| Layer | Technology | Purpose |
|---------|------------|----------|
| Frontend | React.js | User Interface |
| API Gateway | FastAPI | Request Routing |
| Backend | Spring Boot | Business Logic |
| SQL Database | PostgreSQL | Relational Data |
| NoSQL Database | MongoDB | Activity Logs |
| Service Layer | Node.js + Express | MongoDB APIs |
| Security | JWT | Authentication |
| ORM | Spring Data JPA | Database Operations |
| Build Tool | Maven | Dependency Management |
| API Testing | Postman | API Testing |
| API Documentation | Swagger UI | API Documentation |

---

# ⚙️ Port Configuration

| Service | Port |
|----------|------|
| React Frontend | 5173 |
| FastAPI Gateway | 8000 |
| Spring Boot Backend | 8002 |
| Node.js Service | 9000 |
| PostgreSQL | 5432 |
| MongoDB | 27017 |

---

# 🛠 Software & Tools Used

| Tool | Purpose |
|--------|----------|
| Spring Tool Suite (STS) | Spring Development |
| VS Code | Frontend & API Development |
| pgAdmin 4 | PostgreSQL Management |
| MongoDB Compass | MongoDB Management |
| Maven | Build Automation |
| Git | Version Control |
| GitHub | Source Code Hosting |
| Swagger UI | API Documentation |
| Postman | API Testing |
| Uvicorn | FastAPI Runtime |

---

# 📂 Project Structure

```text
CustomerTicketPortal
│
├── ticket_frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
├── ticket_gateway
│   ├── controllers
│   ├── models
│   ├── routers
│   └── main.py
│
├── Support_Ticket_Portal
│   ├── controller
│   ├── service
│   ├── repo
│   ├── model
│   ├── security
│   └── resources
│
├── ticket_services
│   ├── controllers
│   ├── services
│   ├── models
│   ├── config
│   └── server.js
│
├── TicketPortal.sql
│
└── README.md
```

---

# 🗄️ Database Design

## PostgreSQL Tables

| Table | Purpose |
|---------|----------|
| users | User Information |
| tickets | Ticket Information |
| roles | Role Definitions |
| menus | Navigation Menus |
| roles_mapping | RBAC Mapping |

## MongoDB Collections

| Collection | Purpose |
|------------|----------|
| comments | Ticket Comments |
| activities | Ticket Activity Logs |

---

# 🔄 Request Flow

## Login Flow

```text
React UI
    │
    ▼
FastAPI Gateway
    │
    ▼
Spring Boot Backend
    │
    ▼
PostgreSQL
```

## Ticket Creation Flow

```text
React UI
    │
    ▼
FastAPI Gateway
    │
    ▼
Spring Boot Backend
    │
    ▼
PostgreSQL
```

## Activity Log Flow

```text
React UI
    │
    ▼
FastAPI Gateway
    │
    ▼
Node.js Service
    │
    ▼
MongoDB
```

---

# 🔐 Security Implementation

The project implements:

- JWT Authentication
- Role-Based Access Control
- Protected Endpoints
- Admin-Only Operations
- Manager-Level Permissions
- Secure Service Communication

---

# 📖 API Endpoints

## Authentication

```http
POST /users/signup
POST /users/signin
```

## User Management

```http
GET    /users/all
POST   /users/saveuser
PUT    /users/updateuser/{id}
DELETE /users/deleteuser/{id}
```

## Ticket Management

```http
POST   /tickets/create
GET    /tickets/all
PUT    /tickets/update
DELETE /tickets/delete
```

---

# 🚀 Installation Guide

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd CustomerTicketPortal
```

## Step 2: PostgreSQL Setup

Create Database

```sql
CREATE DATABASE ticketdb;
```

Execute

```sql
TicketPortal.sql
```

## Step 3: Start Spring Boot Backend

```bash
mvn clean install
mvn spring-boot:run
```

Backend URL

```text
http://localhost:8002
```

## Step 4: Start FastAPI Gateway

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Gateway URL

```text
http://localhost:8000
```

## Step 5: Start React Frontend

```bash
npm install
npm run dev
```

Frontend URL

```text
http://localhost:5173
```

## Step 6: Start MongoDB Service

```bash
npm install
npm start
```

Node.js Service URL

```text
http://localhost:9000
```

---

# 🎯 Academic Objectives Achieved

✅ Frontend UI Development

✅ FastAPI API Gateway

✅ Spring Boot Backend Development

✅ JWT Authentication

✅ Role-Based Access Control

✅ CRUD Operations

✅ PostgreSQL Database Design

✅ Node.js Backend Development

✅ MongoDB Integration

✅ Frontend-Backend Integration

✅ Distributed Microservices Architecture

---

# 📈 Future Enhancements

- Email Notifications
- Ticket Assignment Engine
- File Attachments
- Dashboard Analytics
- Audit Logging
- Docker Deployment
- Kubernetes Deployment
- CI/CD Pipeline
- Cloud Deployment

---

# 👨‍💻 Developed By

CHENNUPATI DIDDI NAGA SAI

Academic Project

Database Systems & Distributed Backend Development

---

⭐ If you found this project useful, consider giving it a Star on GitHub.
