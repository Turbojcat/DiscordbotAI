// commands/combat/train.js
const { calculateExperienceNeeded } = require('../../utils/gameUtils');
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const { SKILL_LEVELS } = require('../../utils/constants');

module.exports = {
  name: 'train',
  description: 'Train your combat skills',
  execute(message, args) {
    const player = playerData[message.author.id];
    const combatLevel = player.skills.combat.level;

    // Implement combat training logic
    player.skills.combat.experience += calculateExperienceNeeded(combatLevel);

    if (player.skills.combat.experience >= SKILL_LEVELS[combatLevel + 1].totalExperience) {
      player.skills.combat.level++;
      const levelUpEmbed = createEmbed(
        'Level Up!',
        `Congratulations! You have reached combat level ${player.skills.combat.level}.`
      );
      message.reply({ embeds: [levelUpEmbed] });
    }

    const experienceGainedEmbed = createEmbed(
      'Combat Experience Gained',
      `You trained your combat skills and gained ${player.skills.combat.experience} combat experience.`
    );
    message.reply({ embeds: [experienceGainedEmbed] });
  },
};
