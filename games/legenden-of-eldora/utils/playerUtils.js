// games/legenden-om-eldoria/utils/playerUtils.js
function gainExperience(player, experience) {
    player.experience += experience;
  
    const levelUpThreshold = calculateExperienceNeeded(player.level + 1);
    while (player.experience >= levelUpThreshold) {
      player.level++;
      player.experience -= levelUpThreshold;
      // Implement level up bonuses or other logic
    }
  
    return experience;
  }
  
  function calculateExperienceNeeded(level) {
    return 100 * level; // Placeholder
  }
  
  module.exports = {
    gainExperience,
  };
  