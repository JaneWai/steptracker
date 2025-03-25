import React from 'react';
import StepCounter from '../components/StepCounter';
import GoalSetting from '../components/GoalSetting';
import StepChart from '../components/StepChart';
import { useStepData } from '../contexts/StepDataContext';
import './Dashboard.css';

function Dashboard() {
  const { todaySteps, dailyGoal } = useStepData();
  const goalAchieved = todaySteps >= dailyGoal;
  
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {goalAchieved && (
        <div className="alert alert-success">
          Congratulations! You've reached your daily step goal! 🎉
        </div>
      )}
      
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <StepCounter />
          <StepChart />
        </div>
        <div className="dashboard-sidebar">
          <GoalSetting />
          <div className="quick-tips card">
            <h2>Quick Tips</h2>
            <ul className="tips-list">
              <li>Take the stairs instead of the elevator</li>
              <li>Park farther away from entrances</li>
              <li>Take a short walk during lunch breaks</li>
              <li>Set reminders to stand up and move every hour</li>
              <li>Walk while talking on the phone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
