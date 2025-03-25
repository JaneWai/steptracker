import React, { useState } from 'react';
import { useStepData } from '../contexts/StepDataContext';
import StatsCard from '../components/StatsCard';
import AchievementCard from '../components/AchievementCard';
import { format, parseISO, startOfWeek, endOfWeek, differenceInDays } from 'date-fns';
import './Statistics.css';

function Statistics() {
  const { stepData, dailyGoal } = useStepData();
  const [timeframe, setTimeframe] = useState('week');
  
  // Calculate statistics based on data
  const calculateStats = () => {
    if (stepData.length === 0) {
      return {
        totalSteps: 0,
        avgSteps: 0,
        bestDay: { date: '-', steps: 0 },
        goalMetDays: 0,
        currentStreak: 0,
        longestStreak: 0
      };
    }
    
    // Sort data by date
    const sortedData = [...stepData].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    
    // Filter data based on timeframe
    const today = new Date();
    const filteredData = sortedData.filter(entry => {
      const entryDate = parseISO(entry.date);
      
      switch (timeframe) {
        case 'week':
          const weekStart = startOfWeek(today, { weekStartsOn: 0 });
          const weekEnd = endOfWeek(today, { weekStartsOn: 0 });
          return entryDate >= weekStart && entryDate <= weekEnd;
        case 'month':
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          return entryDate >= monthStart && entryDate <= monthEnd;
        case 'year':
          const yearStart = new Date(today.getFullYear(), 0, 1);
          const yearEnd = new Date(today.getFullYear(), 11, 31);
          return entryDate >= yearStart && entryDate <= yearEnd;
        default:
          return true;
      }
    });
    
    // Calculate total steps
    const totalSteps = filteredData.reduce((sum, entry) => sum + entry.steps, 0);
    
    // Calculate average steps
    const avgSteps = filteredData.length > 0 ? Math.round(totalSteps / filteredData.length) : 0;
    
    // Find best day
    const bestDay = filteredData.reduce(
      (best, entry) => entry.steps > best.steps ? { date: entry.date, steps: entry.steps } : best,
      { date: '-', steps: 0 }
    );
    
    // Count days where goal was met
    const goalMetDays = filteredData.filter(entry => entry.steps >= dailyGoal).length;
    
    // Calculate current streak
    let currentStreak = 0;
    const todayStr = format(today, 'yyyy-MM-dd');
    
    // Check if today's entry exists and goal was met
    const todayEntry = sortedData.find(entry => entry.date === todayStr);
    const todayGoalMet = todayEntry && todayEntry.steps >= dailyGoal;
    
    if (todayGoalMet) {
      currentStreak = 1;
      
      // Check previous days
      let checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - 1);
      
      while (true) {
        const dateStr = format(checkDate, 'yyyy-MM-dd');
        const entry = sortedData.find(e => e.date === dateStr);
        
        if (entry && entry.steps >= dailyGoal) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }
    
    // Calculate longest streak
    let longestStreak = 0;
    let currentLongestStreak = 0;
    
    for (let i = 0; i < sortedData.length; i++) {
      const entry = sortedData[i];
      
      if (entry.steps >= dailyGoal) {
        currentLongestStreak++;
        
        if (i < sortedData.length - 1) {
          const currentDate = parseISO(entry.date);
          const nextDate = parseISO(sortedData[i + 1].date);
          const dayDiff = differenceInDays(nextDate, currentDate);
          
          if (dayDiff !== 1) {
            // Streak broken
            longestStreak = Math.max(longestStreak, currentLongestStreak);
            currentLongestStreak = 0;
          }
        }
      } else {
        longestStreak = Math.max(longestStreak, currentLongestStreak);
        currentLongestStreak = 0;
      }
    }
    
    longestStreak = Math.max(longestStreak, currentLongestStreak);
    
    return {
      totalSteps,
      avgSteps,
      bestDay,
      goalMetDays,
      currentStreak,
      longestStreak
    };
  };
  
  const stats = calculateStats();
  
  // Define achievements
  const achievements = [
    {
      title: 'First Steps',
      description: 'Record your first day of steps',
      icon: '👣',
      achieved: stepData.length > 0
    },
    {
      title: 'Goal Setter',
      description: 'Set a custom daily step goal',
      icon: '🎯',
      achieved: dailyGoal !== 10000 // Default is 10000
    },
    {
      title: 'Consistency',
      description: 'Meet your step goal for 7 days in a row',
      icon: '📆',
      achieved: stats.currentStreak >= 7 || stats.longestStreak >= 7
    },
    {
      title: 'Overachiever',
      description: 'Reach 150% of your daily goal',
      icon: '🚀',
      achieved: stepData.some(entry => entry.steps >= dailyGoal * 1.5)
    },
    {
      title: 'Marathon',
      description: 'Walk 20,000 steps in a single day',
      icon: '🏃',
      achieved: stepData.some(entry => entry.steps >= 20000)
    }
  ];
  
  return (
    <div className="statistics">
      <h1>Statistics</h1>
      
      <div className="timeframe-selector">
        <button 
          className={`timeframe-btn ${timeframe === 'week' ? 'active' : ''}`}
          onClick={() => setTimeframe('week')}
        >
          This Week
        </button>
        <button 
          className={`timeframe-btn ${timeframe === 'month' ? 'active' : ''}`}
          onClick={() => setTimeframe('month')}
        >
          This Month
        </button>
        <button 
          className={`timeframe-btn ${timeframe === 'year' ? 'active' : ''}`}
          onClick={() => setTimeframe('year')}
        >
          This Year
        </button>
        <button 
          className={`timeframe-btn ${timeframe === 'all' ? 'active' : ''}`}
          onClick={() => setTimeframe('all')}
        >
          All Time
        </button>
      </div>
      
      <div className="stats-grid">
        <StatsCard 
          title="Total Steps" 
          value={stats.totalSteps.toLocaleString()} 
          icon="👣" 
        />
        <StatsCard 
          title="Average Daily Steps" 
          value={stats.avgSteps.toLocaleString()} 
          icon="📊" 
        />
        <StatsCard 
          title="Best Day" 
          value={stats.bestDay.steps.toLocaleString()} 
          icon="🏆" 
          trend="up"
          trendValue={stats.bestDay.date !== '-' ? format(parseISO(stats.bestDay.date), 'MMM dd') : '-'}
        />
        <StatsCard 
          title="Goal Met Days" 
          value={stats.goalMetDays} 
          icon="✅" 
        />
        <StatsCard 
          title="Current Streak" 
          value={`${stats.currentStreak} days`} 
          icon="🔥" 
        />
        <StatsCard 
          title="Longest Streak" 
          value={`${stats.longestStreak} days`} 
          icon="⭐" 
        />
      </div>
      
      <h2>Achievements</h2>
      <div className="achievements-list">
        {achievements.map((achievement, index) => (
          <AchievementCard 
            key={index}
            title={achievement.title}
            description={achievement.description}
            icon={achievement.icon}
            achieved={achievement.achieved}
          />
        ))}
      </div>
    </div>
  );
}

export default Statistics;
