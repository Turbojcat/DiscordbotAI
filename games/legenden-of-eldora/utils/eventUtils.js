// utils/eventUtils.js
function startEvent(player, eventId) {
    const event = eventData[eventId];
  
    if (!event) {
      return false;
    }
  
    if (!checkEventRequirements(player, event)) {
      return false;
    }
  
    player.activeEvents.push(eventId);
    return true;
  }
  
  function completeEvent(player, eventId) {
    const event = eventData[eventId];
  
    if (!event) {
      return false;
    }
  
    if (!player.activeEvents.includes(eventId)) {
      return false;
    }
  
    if (!checkEventObjectives(player, event)) {
      return false;
    }
  
    player.activeEvents = player.activeEvents.filter(id => id !== eventId);
    player.completedEvents.push(eventId);
    grantEventRewards(player, event);
    return true;
  }
  
  function checkEventRequirements(player, event) {
    // Implement event requirement checking logic
    return true; // Placeholder
  }
  
  function checkEventObjectives(player, event) {
    // Implement event objective checking logic
    return true; // Placeholder
  }
  
  function grantEventRewards(player, event) {
    // Implement event reward granting logic
  }
  
  module.exports = {
    startEvent,
    completeEvent,
  };
  // games/legenden-om-eldoria/utils/eventUtils.js
const events = require('../data/events');

function startEvent(player, eventId) {
  const event = events[eventId];

  if (!event) {
    return false;
  }

  if (player.level < event.requirements.level) {
    return false;
  }

  player.activeEvents.push(eventId);

  return true;
}

function updateEventProgress(player, eventId, objectiveType, objectiveTarget, amount) {
  const event = events[eventId];

  if (!event) {
    return false;
  }

  const objective = event.objectives.find(obj => obj.type === objectiveType && obj.target === objectiveTarget);

  if (!objective) {
    return false;
  }

  if (!player.eventProgress[eventId]) {
    player.eventProgress[eventId] = {};
  }

  if (!player.eventProgress[eventId][objectiveType]) {
    player.eventProgress[eventId][objectiveType] = {};
  }

  if (!player.eventProgress[eventId][objectiveType][objectiveTarget]) {
    player.eventProgress[eventId][objectiveType][objectiveTarget] = 0;
  }

  player.eventProgress[eventId][objectiveType][objectiveTarget] += amount;

  return true;
}

function completeEvent(player, eventId) {
  const event = events[eventId];

  if (!event) {
    return false;
  }

  const isEventComplete = event.objectives.every(objective => {
    const objectiveType = objective.type;
    const objectiveTarget = objective.target;
    const objectiveAmount = objective.amount;
    const playerProgress = player.eventProgress[eventId][objectiveType][objectiveTarget] || 0;

    return playerProgress >= objectiveAmount;
  });

  if (!isEventComplete) {
    return false;
  }

  player.completedEvents.push(eventId);
  player.activeEvents = player.activeEvents.filter(id => id !== eventId);

  const rewards = event.rewards;
  rewards.forEach(reward => {
    if (reward.type === 'experience') {
      gainExperience(player, reward.amount);
    } else if (reward.type === 'item') {
      addItemToInventory(player, reward.item, reward.amount);
    }
    // Handle other reward types
  });

  return true;
}

module.exports = {
  startEvent,
  updateEventProgress,
  completeEvent,
};
