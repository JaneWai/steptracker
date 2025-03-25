import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

const StepDataContext = createContext();

export function useStepData() {
  return useContext(StepDataContext);
}

export function StepDataProvider({ children }) {
  const [stepData, setStepData] = useState(() => {
    const savedData = localStorage.getItem('stepData');
    return savedData ? JSON.parse(savedData) : [];
  });
  
  const [todaySteps, setTodaySteps] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(() => {
    const savedGoal = localStorage.getItem('dailyGoal');
    return savedGoal ? parseInt(savedGoal) : 10000;
  });

  // Load today's steps on initial render
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayEntry = stepData.find(entry => entry.date === today);
    setTodaySteps(todayEntry ? todayEntry.steps : 0);
  }, [stepData]);

  // Save step data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('stepData', JSON.stringify(stepData));
  }, [stepData]);

  // Save daily goal to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dailyGoal', dailyGoal.toString());
  }, [dailyGoal]);

  // Add steps for today
  const addSteps = (steps) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newSteps = parseInt(steps);
    
    if (isNaN(newSteps) || newSteps <= 0) return;
    
    setStepData(prevData => {
      const todayIndex = prevData.findIndex(entry => entry.date === today);
      
      if (todayIndex >= 0) {
        // Update existing entry
        const updatedData = [...prevData];
        updatedData[todayIndex] = {
          ...updatedData[todayIndex],
          steps: updatedData[todayIndex].steps + newSteps
        };
        setTodaySteps(updatedData[todayIndex].steps);
        return updatedData;
      } else {
        // Create new entry for today
        const newEntry = {
          date: today,
          steps: newSteps
        };
        setTodaySteps(newSteps);
        return [...prevData, newEntry];
      }
    });
  };

  // Update daily goal
  const updateDailyGoal = (goal) => {
    const newGoal = parseInt(goal);
    if (isNaN(newGoal) || newGoal <= 0) return;
    setDailyGoal(newGoal);
  };

  // Get step data for a specific date range
  const getStepDataForRange = (startDate, endDate) => {
    return stepData.filter(entry => {
      return entry.date >= startDate && entry.date <= endDate;
    });
  };

  // Get weekly step data
  const getWeeklyStepData = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const weekData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateString = format(date, 'yyyy-MM-dd');
      const entry = stepData.find(e => e.date === dateString);
      weekData.push({
        date: dateString,
        day: format(date, 'EEE'),
        steps: entry ? entry.steps : 0
      });
    }
    
    return weekData;
  };

  const value = {
    stepData,
    todaySteps,
    dailyGoal,
    addSteps,
    updateDailyGoal,
    getStepDataForRange,
    getWeeklyStepData
  };

  return (
    <StepDataContext.Provider value={value}>
      {children}
    </StepDataContext.Provider>
  );
}
