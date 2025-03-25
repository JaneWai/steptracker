import React from 'react';
import './AchievementCard.css';

function AchievementCard({ title, description, icon, achieved }) {
  return (
    <div className={`achievement-card ${achieved ? 'achieved' : 'locked'}`}>
      <div className="achievement-icon">
        {icon}
      </div>
      <div className="achievement-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="achievement-status">
        {achieved ? '✓' : '🔒'}
      </div>
    </div>
  );
}

export default AchievementCard;
