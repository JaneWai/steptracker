import React from 'react';
import './StatsCard.css';

function StatsCard({ title, value, icon, trend, trendValue }) {
  const getTrendClass = () => {
    if (!trend) return '';
    return trend === 'up' ? 'trend-up' : 'trend-down';
  };
  
  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? '↑' : '↓';
  };
  
  return (
    <div className="stats-card">
      <div className="stats-icon">
        {icon}
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <div className="stats-value">{value}</div>
        {trend && (
          <div className={`stats-trend ${getTrendClass()}`}>
            {getTrendIcon()} {trendValue}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;
