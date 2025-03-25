import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'
import { useStepData } from './contexts/StepDataContext'
import { useNotification } from './contexts/NotificationContext'
import { useSettings } from './contexts/SettingsContext'
import { checkGoalProgress } from './utils/notifications'

function App() {
  const { todaySteps, dailyGoal } = useStepData()
  const { showNotification } = useNotification()
  const { notificationsEnabled } = useSettings()

  // Check goal progress and show notifications
  useEffect(() => {
    if (notificationsEnabled) {
      const message = checkGoalProgress(todaySteps, dailyGoal)
      if (message) {
        showNotification(message)
      }
    }
  }, [todaySteps, dailyGoal, showNotification, notificationsEnabled])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="history" element={<History />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
