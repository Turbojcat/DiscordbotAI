// commands/fishing/fish.js
const { calculateExperienceNeeded } = require('../../utils/gameUtils');
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const { SKILL_LEVELS } = require('../../utils/constants');

module.exports = {
  name: 'fish',
  description: 'Go fishing',
  execute(message, args) {
    const player = playerData[message.author.id];
    const location = args[0];

    if (!location) {
      return message.reply('You must specify a location to fish!');
    }

    const fishingLevel = player.skills.fishing.level;
    const requiredLevel = SKILL_LEVELS[location];

    if (fishingLevel < requiredLevel) {
      return message.reply(`You need to be at fishing level ${requiredLevel} to fish in ${location}!`);
    }

    // Implement fishing logic
    player.skills.fishing.experience += calculateExperienceNeeded(fishingLevel);

    if (player.skills.fishing.experience >= SKILL_LEVELS[fishingLevel + 1].totalExperience) {
      player.skills.fishing.level++;
      const levelUpEmbed = createEmbed(
        'Level Up!',
        `Congratulations! You have reached fishing level ${player.skills.fishing.level}.`
      );
      message.reply({ embeds: [levelUpEmbed] });
    }

    const experienceGainedEmbed = createEmbed(
      'Fishing Experience Gained',
      `You fished in ${location} and gained ${player.skills.fishing.experience} fishing experience.`
    );
    message.reply({ embeds: [experienceGainedEmbed] });
  },
};
