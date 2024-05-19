// commands/utility/base.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'base',
  description: 'View your base',
  execute(message) {
    const player = playerData[message.author.id];
    const base = player.base;

    if (!base) {
      const noBaseEmbed = createEmbed(
        'Base',
        'You do not have a base yet.'
      );
      return message.reply({ embeds: [noBaseEmbed] });
    }

    const baseEmbed = createEmbed(
      'Base',
      `Here are the details of your base:`,
      [
        { name: 'Name', value: base.name, inline: true },
        { name: 'Level', value: base.level.toString(), inline: true },
        { name: 'Facilities', value: base.facilities.join(', '), inline: false },
        // Add more base details as needed
      ]
    );

    message.reply({ embeds: [baseEmbed] });
  },
};
