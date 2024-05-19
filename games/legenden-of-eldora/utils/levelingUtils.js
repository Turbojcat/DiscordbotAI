// utils/levelingUtils.js
const { calculateExperienceNeeded } = require('./gameUtils');

function gainExperience(player, amount) {
  player.experience += amount;

  const levelUpThreshold = calculateExperienceNeeded(player.level);

  if (player.experience >= levelUpThreshold) {
    player.level += 1;
    player.experience -= levelUpThreshold;
    levelUpPlayer(player);
  }
}

function levelUpPlayer(player) {
  // Implement level up logic
  // Increase player stats, skills, etc.
}

module.exports = {
  gainExperience,
};
