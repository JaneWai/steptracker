import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'
import { StepDataProvider } from './contexts/StepDataContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { SettingsProvider } from './contexts/SettingsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <StepDataProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </StepDataProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
