// commands/progression/level.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const { calculateExperienceNeeded } = require('../../utils/gameUtils');

module.exports = {
  name: 'level',
  description: 'View your character level and experience',
  execute(message) {
    const player = playerData[message.author.id];

    const levelEmbed = createEmbed(
      'Character Level',
      `You are currently level ${player.level}.`,
      [
        { name: 'Experience', value: player.experience.toString(), inline: true },
        {
          name: 'Experience to Next Level',
          value: calculateExperienceNeeded(player.level).toString(),
          inline: true,
        },
      ]
    );

    message.reply({ embeds: [levelEmbed] });
  },
};
