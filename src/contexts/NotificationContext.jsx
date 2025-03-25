import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  
  const showNotification = useCallback((message) => {
    setNotification(message);
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, []);
  
  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);
  
  const value = {
    notification,
    showNotification,
    hideNotification
  };
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
