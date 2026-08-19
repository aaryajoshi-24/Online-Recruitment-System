import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="sidebar-header">
        <div className="sidebar-brand-icon">
          🛡️
        </div>

        <div className="sidebar-brand-info">
          <span className="sidebar-brand-text">
            JobPortal
          </span>

          <span className="sidebar-brand-sub">
            Applicant Module
          </span>
        </div>
      </div>


      {/* Navigation */}
      <ul className="sidebar-menu">

        {/* Dashboard */}
        <li className="sidebar-menu-item">
          <NavLink
            to="/applicant"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </NavLink>
        </li>


        {/* Job Posts */}
        <li className="sidebar-menu-item">
          <NavLink
            to="/applicant/jobs"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <span className="nav-icon">💼</span>
            <span>Job Posts</span>
          </NavLink>
        </li>


        {/* My Applications */}
        <li className="sidebar-menu-item">
          <NavLink
            to="/applicant/my-applications"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <span className="nav-icon">📑</span>
            <span>My Applications</span>
          </NavLink>
        </li>


        {/* Applicant Profile */}
        <li className="sidebar-menu-item">
          <NavLink
            to="/applicant/profile"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <span className="nav-icon">👤</span>
            <span>Applicant Profile</span>
          </NavLink>
        </li>

      </ul>

    </aside>
  );
}