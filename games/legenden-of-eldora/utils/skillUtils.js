// utils/skillUtils.js
function gainSkillExperience(player, skillName, amount) {
    const skill = player.skills[skillName];
  
    if (!skill) {
      return;
    }
  
    skill.experience += amount;
  
    const levelUpThreshold = calculateSkillExperienceNeeded(skill.level);
  
    if (skill.experience >= levelUpThreshold) {
      skill.level += 1;
      skill.experience -= levelUpThreshold;
      levelUpSkill(player, skillName);
    }
  }
  
  function calculateSkillExperienceNeeded(level) {
    // Implement skill experience calculation logic
    return 100 * level; // Placeholder
  }
  
  function levelUpSkill(player, skillName) {
    // Implement skill level up logic
    // Increase skill bonuses, unlock new abilities, etc.
  }
  
  module.exports = {
    gainSkillExperience,
  };

  // games/legenden-om-eldoria/utils/skillUtils.js
const skills = require('../data/skills');

function gainSkillExperience(player, skillName, experience) {
  const skill = skills[skillName];

  if (!skill) {
    return false;
  }

  if (!player.skills[skillName]) {
    player.skills[skillName] = {
      level: 1,
      experience: 0,
    };
  }

  const playerSkill = player.skills[skillName];
  const currentLevel = playerSkill.level;
  const currentExperience = playerSkill.experience;

  const experienceNeeded = calculateSkillExperienceNeeded(skillName, currentLevel);
  const remainingExperience = currentExperience + experience;

  while (remainingExperience >= experienceNeeded) {
    remainingExperience -= experienceNeeded;
    playerSkill.level++;
  }

  playerSkill.experience = remainingExperience;

  return true;
}

function calculateSkillExperienceNeeded(skillName, level) {
  const skill = skills[skillName];

  if (!skill || level >= skill.levels.length) {
    return Infinity;
  }

  const nextLevel = level + 1;
  const currentLevelData = skill.levels.find(levelData => levelData.level === level);
  const nextLevelData = skill.levels.find(levelData => levelData.level === nextLevel);

  if (!currentLevelData || !nextLevelData) {
    return Infinity;
  }

  return nextLevelData.experienceNeeded - currentLevelData.experienceNeeded;
}

module.exports = {
  gainSkillExperience,
};
