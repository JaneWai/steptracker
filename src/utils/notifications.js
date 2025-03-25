// Check goal progress and return notification message if needed
export function checkGoalProgress(steps, goal) {
  if (!steps || !goal) return null;
  
  const percentage = (steps / goal) * 100;
  
  if (percentage >= 100 && percentage < 110) {
    return 'Congratulations! You\'ve reached your daily step goal! 🎉';
  } else if (percentage >= 150) {
    return 'Amazing! You\'ve crushed your daily goal by 50%! 🚀';
  } else if (percentage >= 50 && percentage < 60) {
    return 'You\'re halfway to your daily step goal! Keep going! 👟';
  } else if (percentage >= 75 && percentage < 85) {
    return 'Almost there! Just 25% more to reach your daily goal! 💪';
  } else if (percentage >= 90 && percentage < 100) {
    return 'So close! Just a few more steps to reach your goal! 🏃';
  }
  
  return null;
}

// Generate motivational messages
export function getMotivationalMessage() {
  const messages = [
    'Every step counts towards a healthier you!',
    'Small steps lead to big changes over time.',
    'Walking is the best medicine.',
    'Your future self will thank you for the steps you take today.',
    'Progress is progress, no matter how small.',
    'Walking: the most ancient exercise and still the best modern exercise.',
    'A journey of a thousand miles begins with a single step.',
    'The more you walk, the better you\'ll feel.',
    'Walking is man\'s best medicine.',
    'Keep moving forward, one step at a time.'
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
}
