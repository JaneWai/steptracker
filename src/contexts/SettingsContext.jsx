import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationsEnabled');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });
  
  const [units, setUnits] = useState(() => {
    const saved = localStorage.getItem('units');
    return saved || 'metric';
  });
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    localStorage.setItem('theme', theme);
    localStorage.setItem('units', units);
  }, [notificationsEnabled, theme, units]);
  
  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
  };
  
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  
  const changeUnits = (newUnits) => {
    setUnits(newUnits);
  };
  
  const value = {
    notificationsEnabled,
    theme,
    units,
    toggleNotifications,
    changeTheme,
    changeUnits
  };
  
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
