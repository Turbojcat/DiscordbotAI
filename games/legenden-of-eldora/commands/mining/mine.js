// commands/mining/mine.js
const { calculateExperienceNeeded } = require('../../utils/gameUtils');
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const { SKILL_LEVELS } = require('../../utils/constants');

module.exports = {
  name: 'mine',
  description: 'Mine for resources',
  execute(message, args) {
    const player = playerData[message.author.id];
    const resource = args[0];

    if (!resource) {
      return message.reply('You must specify a resource to mine!');
    }

    const miningLevel = player.skills.mining.level;
    const requiredLevel = SKILL_LEVELS[resource];

    if (miningLevel < requiredLevel) {
      return message.reply(`You need to be at mining level ${requiredLevel} to mine ${resource}!`);
    }

    // Implement mining logic
    player.skills.mining.experience += calculateExperienceNeeded(miningLevel);

    if (player.skills.mining.experience >= SKILL_LEVELS[miningLevel + 1].totalExperience) {
      player.skills.mining.level++;
      const levelUpEmbed = createEmbed(
        'Level Up!',
        `Congratulations! You have reached mining level ${player.skills.mining.level}.`
      );
      message.reply({ embeds: [levelUpEmbed] });
    }

    const experienceGainedEmbed = createEmbed(
      'Mining Experience Gained',
      `You mined ${resource} and gained ${player.skills.mining.experience} mining experience.`
    );
    message.reply({ embeds: [experienceGainedEmbed] });
  },
};
