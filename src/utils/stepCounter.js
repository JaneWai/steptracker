// Convert steps to distance based on units
export function stepsToDistance(steps, units = 'metric') {
  // Average stride length: ~0.762 meters
  // 1 step ≈ 0.762 meters
  const metersPerStep = 0.762;
  const stepsPerKm = 1000 / metersPerStep; // ~1312 steps per km
  const stepsPerMile = 1609.34 / metersPerStep; // ~2112 steps per mile
  
  if (units === 'metric') {
    return (steps / stepsPerKm).toFixed(2) + ' km';
  } else {
    return (steps / stepsPerMile).toFixed(2) + ' mi';
  }
}

// Convert steps to calories burned (very rough estimate// Convert steps to calories burned (very rough estimate)
export function stepsToCalories(steps, weight = 70) {
  // Average calorie burn: ~0.04 calories per step for a 70kg person
  // Adjust based on weight
  const caloriesPerStep = 0.04 * (weight / 70);
  return Math.round(steps * caloriesPerStep);
}

// Calculate step statistics
export function calculateStepStats(stepData) {
  if (!stepData || stepData.length === 0) {
    return {
      totalSteps: 0,
      averageSteps: 0,
      bestDay: null,
      worstDay: null
    };
  }
  
  const totalSteps = stepData.reduce((sum, day) => sum + day.steps, 0);
  const averageSteps = Math.round(totalSteps / stepData.length);
  
  const bestDay = stepData.reduce((best, current) => 
    current.steps > best.steps ? current : best, stepData[0]);
    
  const worstDay = stepData.reduce((worst, current) => 
    current.steps < worst.steps ? current : worst, stepData[0]);
  
  return {
    totalSteps,
    averageSteps,
    bestDay,
    worstDay
  };
}
