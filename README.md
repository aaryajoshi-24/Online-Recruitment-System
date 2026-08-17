# Online Recruitment System

A full-stack web application designed to simplify the recruitment process. The system provides separate interfaces for applicants and administrators, allowing applicants to search and apply for jobs while administrators manage job posts, applications, and applicant records.

## 👥 Team Responsibilities

### 👩‍💻 Admin Module — Aarya Joshi

* Admin Login
* Admin Dashboard
* Job Post Management

  * Add new jobs
  * View job posts
  * Edit/update jobs
  * Delete jobs
* Application Management

  * View submitted applications
  * View application details
  * Update application status
* Applicant Management

  * View applicant records
  * View applicant details
* Categories Management
* User/Admin Management
* Reports & Analytics
* Settings
* Final module integration and testing

### 👩‍💻 Applicant Module — Loga Shree

* Home Page
* View available jobs
* Search/filter jobs
* Job Details
* Application Form
* Submit Application
* Application Confirmation
* My Applications
* Application Details
* Applicant Profile
* Frontend testing

## 🛠️ Technology Stack

### Frontend

* React.js
* CSS / Tailwind CSS / Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Version Control

* Git
* GitHub

## 📁 Project Structure

```text
Online-Recruitment-System/
│
├── client/                       # React frontend
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   ├── admin/
│       │   └── applicant/
│       │
│       ├── pages/
│       │   ├── admin/
│       │   └── applicant/
│       │
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── server/                       # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── README.md
└── .gitignore
```

## 🔗 Module Integration

Both modules will be integrated into the same web application and will use the same backend and database.

### Application Flow

```text
Applicant
    ↓
Application Form
    ↓
Express / Node.js API
    ↓
Database
    ↓
Admin Dashboard
    ↓
View & Manage Application
```

### Job Flow

```text
Admin
    ↓
Create / Update Job
    ↓
Express / Node.js API
    ↓
Database
    ↓
Applicant Job Listing
    ↓
View Job
    ↓
Apply
```

## 🌿 Git Branch Strategy

The `main` branch will contain the stable and integrated version of the project.

### Admin Module

```text
feature/admin-module
```

Developer: **Aarya Joshi**

### Applicant Module

```text
feature/applicant-module
```

Developer: **Loga Shree**

### Development Rules

1. Do not directly develop on the `main` branch.
2. Each team member should work on their assigned feature branch.
3. Pull the latest changes before starting new work.
4. Use meaningful commit messages.
5. Test changes before pushing.
6. Do not modify another member's module without discussion.
7. Keep API and database structures consistent.
8. Create a Pull Request before merging completed work into `main`.
9. Resolve merge conflicts carefully.
10. Test both modules together before final submission.

## 🎨 UI Design

Both modules should follow a common design system so that they look like parts of the same web application.

The design should maintain consistency in:

* Colors
* Typography
* Buttons
* Forms
* Cards
* Tables
* Spacing
* Border radius
* Navigation
* Responsive layout

The Applicant Module and Admin Module will have different layouts and functionality but should maintain the same overall visual identity.

## 🎯 Main Features

### Admin

* Manage job posts
* Manage applications
* Manage applicant records
* Track application status
* View recruitment analytics

### Applicant

* Browse available jobs
* Search and filter jobs
* View job details
* Submit applications
* Track submitted applications
* Manage applicant profile

## 📅 Project Deadline

**19 August 2026**

## 🤝 Collaboration

This project is developed collaboratively using Git and GitHub. Each team member will work on their assigned module and the completed modules will be integrated into the `main` branch for the final application.
