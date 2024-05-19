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
// games/legenden-om-eldoria/utils/gameUtils.js
const skills = require('../data/skills');

function calculateDamage(attacker, defender, weapon) {
  let baseDamage = weapon.stats.damage || 0;
  const attackerSkill = attacker.skills[weapon.skill];

  if (attackerSkill) {
    const skillLevel = attackerSkill.level;
    const skillLevelData = skills[weapon.skill].levels.find(level => level.level === skillLevel);
    baseDamage += skillLevelData.damageBonus;
  }

  // Add additional damage calculations based on other factors

  return baseDamage;
}

module.exports = {
  calculateDamage,
  // Other functions exported from gameUtils.js
};
