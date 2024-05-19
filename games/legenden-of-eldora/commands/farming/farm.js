// commands/farming/farm.js
const { calculateExperienceNeeded } = require('../../utils/gameUtils');
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const { SKILL_LEVELS } = require('../../utils/constants');

module.exports = {
  name: 'farm',
  description: 'Cultivate a crop',
  execute(message, args) {
    const player = playerData[message.author.id];
    const crop = args[0];

    if (!crop) {
      return message.reply('You must specify a crop to cultivate!');
    }

    const farmingLevel = player.skills.farming.level;
    const requiredLevel = SKILL_LEVELS[crop];

    if (farmingLevel < requiredLevel) {
      return message.reply(`You need to be at farming level ${requiredLevel} to cultivate ${crop}!`);
    }

    // Implement crop cultivation logic
    player.skills.farming.experience += calculateExperienceNeeded(farmingLevel);

    if (player.skills.farming.experience >= SKILL_LEVELS[farmingLevel + 1].totalExperience) {
      player.skills.farming.level++;
      const levelUpEmbed = createEmbed(
        'Level Up!',
        `Congratulations! You have reached farming level ${player.skills.farming.level}.`
      );
      message.reply({ embeds: [levelUpEmbed] });
    }

    const experienceGainedEmbed = createEmbed(
      'Farming Experience Gained',
      `You cultivated ${crop} and gained ${player.skills.farming.experience} farming experience.`
    );
    message.reply({ embeds: [experienceGainedEmbed] });
  },
};
