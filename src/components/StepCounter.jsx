import React, { useState } from 'react';
import { useStepData } from '../contexts/StepDataContext';
import { useNotification } from '../contexts/NotificationContext';
import './StepCounter.css';

function StepCounter() {
  const [stepsToAdd, setStepsToAdd] = useState('');
  const { todaySteps, dailyGoal, addSteps } = useStepData();
  const { showNotification } = useNotification();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!stepsToAdd || isNaN(stepsToAdd) || parseInt(stepsToAdd) <= 0) {
      showNotification('Please enter a valid number of steps');
      return;
    }
    
    addSteps(parseInt(stepsToAdd));
    showNotification(`Added ${stepsToAdd} steps!`);
    setStepsToAdd('');
  };
  
  const progressPercentage = Math.min((todaySteps / dailyGoal) * 100, 100);
  
  return (
    <div className="step-counter card">
      <h2>Today's Steps</h2>
      
      <div className="step-display">
        <div className="step-count">{todaySteps}</div>
        <div className="step-goal">Goal: {dailyGoal}</div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="progress-text">
        {progressPercentage < 100 
          ? `${Math.round(progressPercentage)}% of daily goal` 
          : 'Daily goal achieved! 🎉'}
      </div>
      
      <form onSubmit={handleSubmit} className="add-steps-form">
        <div className="form-group">
          <label htmlFor="steps">Add Steps</label>
          <input
            type="number"
            id="steps"
            className="form-control"
            value={stepsToAdd}
            onChange={(e) => setStepsToAdd(e.target.value)}
            placeholder="Enter steps"
            min="1"
          />
        </div>
        <button type="submit" className="btn">Add Steps</button>
      </form>
    </div>
  );
}

export default StepCounter;
