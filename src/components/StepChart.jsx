import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useStepData } from '../contexts/StepDataContext';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './StepChart.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StepChart() {
  const { getWeeklyStepData, dailyGoal } = useStepData();
  const weeklyData = getWeeklyStepData();
  
  const chartData = {
    labels: weeklyData.map(day => day.day),
    datasets: [
      {
        label: 'Steps',
        data: weeklyData.map(day => day.steps),
        backgroundColor: weeklyData.map(day => 
          day.steps >= dailyGoal ? 'rgba(76, 175, 80, 0.7)' : 'rgba(33, 150, 243, 0.7)'
        ),
        borderColor: weeklyData.map(day => 
          day.steps >= dailyGoal ? 'rgba(76, 175, 80, 1)' : 'rgba(33, 150, 243, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Step Progress',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const steps = context.raw;
            const percentage = Math.round((steps / dailyGoal) * 100);
            return [
              `Steps: ${steps.toLocaleString()}`,
              `${percentage}% of daily goal`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Steps',
        },
        ticks: {
          callback: function(value) {
            if (value >= 1000) {
              return value / 1000 + 'k';
            }
            return value;
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
    },
  };
  
  return (
    <div className="step-chart card">
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color goal-met"></span>
          <span>Goal Met</span>
        </div>
        <div className="legend-item">
          <span className="legend-color goal-not-met"></span>
          <span>Goal Not Met</span>
        </div>
      </div>
    </div>
  );
}

export default StepChart;
