import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand-icon">🛡️</div>
        <div>
          <span className="sidebar-brand-text">JobPortal</span>
          <span className="sidebar-brand-sub">Applicant Module</span>
        </div>
      </div>

      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>📊</span> Dashboard
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>💼</span> Job Posts
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/my-applications" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>📑</span> My Applications
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>👤</span> Applicant Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}