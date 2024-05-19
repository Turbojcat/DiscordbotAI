// utils/gameUtils.js
const { SKILL_LEVELS, MONSTER_LEVELS, ITEM_RARITIES } = require('./constants');

function calculateExperienceNeeded(currentLevel) {
  const nextLevel = currentLevel + 1;
  const currentLevelExperience = SKILL_LEVELS[currentLevel].totalExperience;
  const nextLevelExperience = SKILL_LEVELS[nextLevel] ? SKILL_LEVELS[nextLevel].totalExperience : Infinity;
  return nextLevelExperience - currentLevelExperience;
}

function generateLoot(monsterLevel) {
  // Implement loot generation logic based on monster level
  // Return an array of items or resources
}

module.exports = { calculateExperienceNeeded, generateLoot };

// utils/gameUtils.js
function calculateExperienceNeeded(level) {
  // Implement experience calculation logic
  return 100 * level; // Placeholder
}

function calculateDamage(attacker, defender) {
  // Implement damage calculation logic
  return 10; // Placeholder
}

module.exports = {
  calculateExperienceNeeded,
  calculateDamage,
};
