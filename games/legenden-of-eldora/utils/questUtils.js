// utils/questUtils.js
function startQuest(player, questId) {
    const quest = questData[questId];
  
    if (!quest) {
      return false;
    }
  
    if (!checkQuestRequirements(player, quest)) {
      return false;
    }
  
    player.activeQuests.push(questId);
    return true;
  }
  
  function completeQuest(player, questId) {
    const quest = questData[questId];
  
    if (!quest) {
      return false;
    }
  
    if (!player.activeQuests.includes(questId)) {
      return false;
    }
  
    if (!checkQuestObjectives(player, quest)) {
      return false;
    }
  
    player.activeQuests = player.activeQuests.filter(id => id !== questId);
    player.completedQuests.push(questId);
    grantQuestRewards(player, quest);
    return true;
  }
  
  function checkQuestRequirements(player, quest) {
    // Implement quest requirement checking logic
    return true; // Placeholder
  }
  
  function checkQuestObjectives(player, quest) {
    // Implement quest objective checking logic
    return true; // Placeholder
  }
  
  function grantQuestRewards(player, quest) {
    // Implement quest reward granting logic
  }
  
  module.exports = {
    startQuest,
    completeQuest,
  };
  // games/legenden-om-eldoria/utils/questUtils.js
const quests = require('../data/quests');

function startQuest(player, questId) {
  const quest = quests[questId];

  if (!quest) {
    return false;
  }

  if (player.level < quest.requirements.level) {
    return false;
  }

  player.activeQuests.push(questId);

  return true;
}

function updateQuestProgress(player, questId, objectiveType, objectiveTarget, amount) {
  const quest = quests[questId];

  if (!quest) {
    return false;
  }

  const objective = quest.objectives.find(obj => obj.type === objectiveType && obj.target === objectiveTarget);

  if (!objective) {
    return false;
  }

  if (!player.questProgress[questId]) {
    player.questProgress[questId] = {};
  }

  if (!player.questProgress[questId][objectiveType]) {
    player.questProgress[questId][objectiveType] = {};
  }

  if (!player.questProgress[questId][objectiveType][objectiveTarget]) {
    player.questProgress[questId][objectiveType][objectiveTarget] = 0;
  }

  player.questProgress[questId][objectiveType][objectiveTarget] += amount;

  return true;
}

function completeQuest(player, questId) {
  const quest = quests[questId];

  if (!quest) {
    return false;
  }

  const isQuestComplete = quest.objectives.every(objective => {
    const objectiveType = objective.type;
    const objectiveTarget = objective.target;
    const objectiveAmount = objective.amount;
    const playerProgress = player.questProgress[questId][objectiveType][objectiveTarget] || 0;

    return playerProgress >= objectiveAmount;
  });

  if (!isQuestComplete) {
    return false;
  }

  player.completedQuests.push(questId);
  player.activeQuests = player.activeQuests.filter(id => id !== questId);

  const rewards = quest.rewards;
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
  startQuest,
  updateQuestProgress,
  completeQuest,
};
