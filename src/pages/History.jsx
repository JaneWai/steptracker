import React, { useState } from 'react';
import { useStepData } from '../contexts/StepDataContext';
import { format, subDays, parseISO } from 'date-fns';
import './History.css';

function History() {
  const { stepData, dailyGoal } = useStepData();
  const [filter, setFilter] = useState('all');
  
  // Sort data by date (newest first)
  const sortedData = [...stepData].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  // Filter data based on selected filter
  const filteredData = sortedData.filter(entry => {
    const today = new Date();
    const entryDate = parseISO(entry.date);
    
    switch (filter) {
      case 'week':
        return entryDate >= subDays(today, 7);
      case 'month':
        return entryDate >= subDays(today, 30);
      case 'goal-met':
        return entry.steps >= dailyGoal;
      case 'goal-missed':
        return entry.steps < dailyGoal;
      default:
        return true;
    }
  });
  
  return (
    <div className="history">
      <h1>Step History</h1>
      
      <div className="filter-controls">
        <label htmlFor="filter">Filter:</label>
        <select 
          id="filter" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="form-control"
        >
          <option value="all">All Time</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="goal-met">Goal Met</option>
          <option value="goal-missed">Goal Missed</option>
        </select>
      </div>
      
      {filteredData.length === 0 ? (
        <div className="no-data">
          <p>No step data available for the selected filter.</p>
        </div>
      ) : (
        <div className="history-list">
          {filteredData.map(entry => (
            <div 
              key={entry.date} 
              className={`history-item ${entry.steps >= dailyGoal ? 'goal-met' : 'goal-missed'}`}
            >
              <div className="history-date">
                {format(parseISO(entry.date), 'MMM dd, yyyy')}
              </div>
              <div className="history-steps">
                {entry.steps.toLocaleString()} steps
              </div>
              <div className="history-goal">
                {Math.round((entry.steps / dailyGoal) * 100)}% of goal
              </div>
              <div className="history-status">
                {entry.steps >= dailyGoal ? '✓' : '✗'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
