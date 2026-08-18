# Online Recruitment System - Applicant Module

A full-stack job application platform built with React, Node.js, Express, and MySQL.

---

## 1. Prerequisites
- **Node.js** (v16+)
- **MySQL** and **phpMyAdmin** (e.g. XAMPP or standalone MySQL server)

---

## 2. Database Setup (phpMyAdmin)
1. Open phpMyAdmin (`http://localhost/phpmyadmin`).
2. Click on the **SQL** tab.
3. Open `database/database.sql` from this project, copy its full content, paste it into the phpMyAdmin SQL editor, and click **Go**.
4. This creates the `online_recruitment` database along with tables (`categories`, `applicants`, `jobs`, `applications`) and 5 initial active job listings.

---

## 3. Server Configuration & Setup
1. Open a terminal in the root directory.
2. Navigate to server:
   ```bash
   cd server
   npm install