// commands/utility/sell.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'sell',
  description: 'Sell an item',
  execute(message, args) {
    const player = playerData[message.author.id];
    const itemName = args[0];

    if (!itemName) {
      return message.reply('You must specify an item to sell!');
    }

    const item = player.inventory.find(i => i.name.toLowerCase() === itemName.toLowerCase());

    if (!item) {
      return message.reply(`You don't have ${itemName} in your inventory!`);
    }

    // Implement selling logic
    const soldPrice = sellItem(player, item);

    const sellEmbed = createEmbed(
      'Item Sold',
      `You have sold ${item.name} for ${soldPrice} gold.`
    );
    message.reply({ embeds: [sellEmbed] });
  },
};

function sellItem(player, item) {
  // Implement selling logic
  // Remove the item from the player's inventory
  // Calculate and return the selling price
  return 100; // Placeholder
}
