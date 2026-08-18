CREATE DATABASE IF NOT EXISTS online_recruitment;
USE online_recruitment;

-- Drop existing tables if re-creating
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS applicants;

-- Categories Table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Applicants Table
CREATE TABLE applicants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  resume_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs Table
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  company VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  category_id INT,
  type VARCHAR(50) NOT NULL,
  salary VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  requirements TEXT NOT NULL,
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Applications Table
CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  applicant_id INT NOT NULL,
  job_id INT NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  status ENUM('Pending', 'Under Review', 'Shortlisted', 'Rejected', 'Selected') DEFAULT 'Pending',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Seed Categories
INSERT INTO categories (id, name) VALUES
(1, 'Development'),
(2, 'Design'),
(3, 'Marketing'),
(4, 'Human Resources'),
(5, 'IT Operations');

-- Seed Sample Applicant (Demo ID = 1)
INSERT INTO applicants (id, name, email, phone, resume_url) VALUES
(1, 'Aarav Sharma', 'aarav.sharma@email.com', '+91 98765 43210', 'https://example.com/resumes/aarav_sharma_resume.pdf');

-- Seed Sample Active Jobs
INSERT INTO jobs (id, title, company, location, category_id, type, salary, description, responsibilities, requirements, status) VALUES
(1, 'Frontend Developer', 'TechNova Solutions', 'Chennai', 1, 'Full Time', '₹6,00,000 - ₹8,00,000 P.A.', 
'We are looking for a skilled Frontend Developer to build modern, interactive user interfaces using React.js and contemporary front-end tools.',
'Develop dynamic UI components, integrate backend REST APIs, ensure cross-browser compatibility, and optimize client performance.',
'2+ years experience in HTML, CSS, JavaScript, React.js, and Axios.', 'Active'),

(2, 'Backend Developer', 'DataEdge Systems', 'Chennai', 1, 'Full Time', '₹7,00,000 - ₹10,00,000 P.A.',
'Seeking an experienced Node.js / Express developer to design scalable APIs and efficiently query relational MySQL databases.',
'Design REST APIs, write optimized MySQL queries, implement middleware security, handle data storage and backend logic.',
'Strong knowledge of Node.js, Express framework, MySQL database design, and asynchronous programming.', 'Active'),

(3, 'UI/UX Designer', 'CreativeMind Studios', 'Bengaluru', 2, 'Full Time', '₹5,50,000 - ₹7,50,000 P.A.',
'Join our design team to craft sleek user journeys, wireframes, and modern interfaces for desktop and mobile applications.',
'Create wireframes, user flows, interactive prototypes, visual designs, and collaborate closely with product engineers.',
'Proficiency in Figma or Adobe XD, understanding of design systems, color theory, and user experience principles.', 'Active'),

(4, 'Software Engineer', 'InnoSoft Technologies', 'Hyderabad', 1, 'Full Time', '₹8,00,000 - ₹12,00,000 P.A.',
'We are hiring full-stack software engineers capable of building end-to-end web applications and managing databases.',
'Build complete web modules, participate in system architecture discussions, debug complex issues, write testable code.',
'Degree in Computer Science or IT, proficiency in JS frameworks, algorithms, data structures, and SQL.', 'Active'),

(5, 'Data Analyst', 'Metrics Corp', 'Mumbai', 5, 'Part Time', '₹4,50,000 - ₹6,00,000 P.A.',
'Looking for an analytical mind to convert raw operational data into actionable business intelligence and clear visual reports.',
'Extract and clean database data, generate reports, perform trend analysis, communicate findings with operations teams.',
'Proficiency in SQL, Excel, data visualization tools, and basic statistical analysis.', 'Active');

-- Seed Sample Applications for Demo Applicant (Applicant ID = 1)
INSERT INTO applications (id, applicant_id, job_id, full_name, email, phone, resume_url, cover_letter, status, applied_at) VALUES
(101, 1, 1, 'Aarav Sharma', 'aarav.sharma@email.com', '+91 98765 43210', 'https://example.com/resumes/aarav_sharma_resume.pdf', 'I am excited to apply for the Frontend Developer position. I have 3 years of hands-on experience building web apps with React.', 'Pending', '2026-08-10 10:30:00'),
(102, 1, 3, 'Aarav Sharma', 'aarav.sharma@email.com', '+91 98765 43210', 'https://example.com/resumes/aarav_sharma_resume.pdf', 'I am passionate about building modern UI components and design system integration.', 'Shortlisted', '2026-08-12 14:15:00');