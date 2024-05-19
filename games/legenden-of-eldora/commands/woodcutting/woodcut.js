// commands/woodcutting/woodcut.js
const { calculateExperienceNeeded } = require('../../utils/gameUtils');
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const { SKILL_LEVELS } = require('../../utils/constants');

module.exports = {
  name: 'woodcut',
  description: 'Cut down trees for resources',
  execute(message, args) {
    const player = playerData[message.author.id];
    const resource = args[0];

    if (!resource) {
      return message.reply('You must specify a resource to cut!');
    }

    const woodcuttingLevel = player.skills.woodcutting.level;
    const requiredLevel = SKILL_LEVELS[resource];

    if (woodcuttingLevel < requiredLevel) {
      return message.reply(`You need to be at woodcutting level ${requiredLevel} to cut ${resource}!`);
    }

    // Implement woodcutting logic
    player.skills.woodcutting.experience += calculateExperienceNeeded(woodcuttingLevel);

    if (player.skills.woodcutting.experience >= SKILL_LEVELS[woodcuttingLevel + 1].totalExperience) {
      player.skills.woodcutting.level++;
      const levelUpEmbed = createEmbed(
        'Level Up!',
        `Congratulations! You have reached woodcutting level ${player.skills.woodcutting.level}.`
      );
      message.reply({ embeds: [levelUpEmbed] });
    }

    const experienceGainedEmbed = createEmbed(
      'Woodcutting Experience Gained',
      `You cut ${resource} and gained ${player.skills.woodcutting.experience} woodcutting experience.`
    );
    message.reply({ embeds: [experienceGainedEmbed] });
  },
};
