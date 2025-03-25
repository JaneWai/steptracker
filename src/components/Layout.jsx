import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNotification } from '../contexts/NotificationContext';
import './Navbar.css';
import './Footer.css';

function Layout() {
  const { notification } = useNotification();

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {notification && (
          <div className="notification">
            {notification}
          </div>
        )}
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
