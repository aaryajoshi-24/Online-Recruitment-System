import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import ApplyJob from './pages/ApplyJob';
import ApplicationSuccess from './pages/ApplicationSuccess';
import MyApplications from './pages/MyApplications';
import ApplicationDetails from './pages/ApplicationDetails';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Left Dark Navigation Sidebar */}
        <Navbar />

        {/* Right Main Content Section */}
        <div className="main-area">
          {/* Top White Header Bar */}
          <header className="top-header">
            <div className="top-header-title">Applicant Portal</div>
            <div className="top-header-user">
              <div className="user-avatar">AS</div>
              <div className="user-info">
                <div className="user-name">Aarav Sharma</div>
                <div className="user-role">Applicant</div>
              </div>
            </div>
          </header>

          {/* Main Page Area */}
          <main className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/apply/:jobId" element={<ApplyJob />} />
              <Route path="/application-success" element={<ApplicationSuccess />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/applications/:id" element={<ApplicationDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}