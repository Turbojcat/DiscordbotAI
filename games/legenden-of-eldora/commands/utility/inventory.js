// commands/utility/inventory.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'inventory',
  description: 'View your inventory',
  execute(message) {
    const player = playerData[message.author.id];

    if (player.inventory.length === 0) {
      const emptyEmbed = createEmbed(
        'Inventory',
        'Your inventory is empty.'
      );
      return message.reply({ embeds: [emptyEmbed] });
    }

    const inventoryEmbed = createEmbed(
      'Inventory',
      'Here are the items in your inventory:'
    );

    player.inventory.forEach(item => {
      inventoryEmbed.addField(item.name, item.description, true);
    });

    message.reply({ embeds: [inventoryEmbed] });
  },
};
