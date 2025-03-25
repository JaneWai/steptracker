import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <h1>StepTracker</h1>
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
              History
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistics" className={({ isActive }) => isActive ? 'active' : ''}>
              Statistics
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
