import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useStepData } from '../contexts/StepDataContext';
import { useNotification } from '../contexts/NotificationContext';
import './Settings.css';

function Settings() {
  const { 
    notificationsEnabled, 
    toggleNotifications,
    theme,
    changeTheme,
    units,
    changeUnits
  } = useSettings();
  
  const { stepData } = useStepData();
  const { showNotification } = useNotification();
  
  const [exportFormat, setExportFormat] = useState('json');
  
  const handleExportData = () => {
    try {
      let dataStr;
      
      if (exportFormat === 'json') {
        dataStr = JSON.stringify(stepData, null, 2);
      } else if (exportFormat === 'csv') {
        // Create CSV header
        dataStr = 'Date,Steps\n';
        
        // Add data rows
        stepData.forEach(entry => {
          dataStr += `${entry.date},${entry.steps}\n`;
        });
      }
      
      // Create download link
      const blob = new Blob([dataStr], { type: exportFormat === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `steptracker-data.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showNotification('Data exported successfully!');
    } catch (error) {
      showNotification('Error exporting data. Please try again.');
      console.error('Export error:', error);
    }
  };
  
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your step data? This action cannot be undone.')) {
      localStorage.removeItem('stepData');
      window.location.reload();
    }
  };
  
  return (
    <div className="settings">
      <h1>Settings</h1>
      
      <div className="settings-section card">
        <h2>Notifications</h2>
        <div className="setting-item">
          <div className="setting-info">
            <h3>Enable Notifications</h3>
            <p>Receive notifications about your step progress</p>
          </div>
          <div className="setting-control">
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={notificationsEnabled}
                onChange={toggleNotifications}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="settings-section card">
        <h2>Display</h2>
        <div className="setting-item">
          <div className="setting-info">
            <h3>Theme</h3>
            <p>Choose your preferred app theme</p>
          </div>
          <div className="setting-control">
            <select 
              value={theme}
              onChange={(e) => changeTheme(e.target.value)}
              className="form-control"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h3>Units</h3>
            <p>Choose your preferred measurement units</p>
          </div>
          <div className="setting-control">
            <select 
              value={units}
              onChange={(e) => changeUnits(e.target.value)}
              className="form-control"
            >
              <option value="metric">Metric (km)</option>
              <option value="imperial">Imperial (miles)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="settings-section card">
        <h2>Data Management</h2>
        <div className="setting-item">
          <div className="setting-info">
            <h3>Export Data</h3>
            <p>Download your step data in various formats</p>
          </div>
          <div className="setting-control export-controls">
            <select 
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="form-control"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
            <button 
              className="btn"
              onClick={handleExportData}
              disabled={stepData.length === 0}
            >
              Export
            </button>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h3>Clear Data</h3>
            <p>Delete all your step data (cannot be undone)</p>
          </div>
          <div className="setting-control">
            <button 
              className="btn btn-danger"
              onClick={handleClearData}
              disabled={stepData.length === 0}
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
      
      <div className="settings-section card">
        <h2>About</h2>
        <div className="about-info">
          <p><strong>StepTracker</strong> v1.0.0</p>
          <p>A simple step tracking application to help you stay active.</p>
          <p>© 2025 StepTracker</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
