import React, { useState } from 'react';
import { useStepData } from '../contexts/StepDataContext';
import { useNotification } from '../contexts/NotificationContext';
import './GoalSetting.css';

function GoalSetting() {
  const { dailyGoal, updateDailyGoal } = useStepData();
  const { showNotification } = useNotification();
  const [newGoal, setNewGoal] = useState(dailyGoal);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newGoal || isNaN(newGoal) || parseInt(newGoal) <= 0) {
      showNotification('Please enter a valid goal');
      return;
    }
    
    updateDailyGoal(parseInt(newGoal));
    showNotification('Daily step goal updated!');
  };
  
  return (
    <div className="goal-setting card">
      <h2>Set Daily Goal</h2>
      
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label htmlFor="goal">Daily Step Goal</label>
          <input
            type="number"
            id="goal"
            className="form-control"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter daily goal"
            min="1"
          />
        </div>
        <button type="submit" className="btn">Update Goal</button>
      </form>
      
      <div className="goal-presets">
        <p>Quick presets:</p>
        <div className="preset-buttons">
          <button 
            className="preset-btn" 
            onClick={() => setNewGoal(5000)}
          >
            5,000
          </button>
          <button 
            className="preset-btn" 
            onClick={() => setNewGoal(7500)}
          >
            7,500
          </button>
          <button 
            className="preset-btn" 
            onClick={() => setNewGoal(10000)}
          >
            10,000
          </button>
          <button 
            className="preset-btn" 
            onClick={() => setNewGoal(12500)}
          >
            12,500
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalSetting;
