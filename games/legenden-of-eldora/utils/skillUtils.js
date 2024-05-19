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
  