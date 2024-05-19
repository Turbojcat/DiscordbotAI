// commands/utility/equip.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');

module.exports = {
  name: 'equip',
  description: 'Equip an item',
  execute(message, args) {
    const player = playerData[message.author.id];
    const itemName = args[0];

    if (!itemName) {
      return message.reply('You must specify an item to equip!');
    }

    const item = player.inventory.find(i => i.name.toLowerCase() === itemName.toLowerCase());

    if (!item) {
      return message.reply(`You don't have ${itemName} in your inventory!`);
    }

    // Implement equipping logic
    equipItem(player, item);

    const equipEmbed = createEmbed(
      'Item Equipped',
      `You have equipped ${item.name}.`
    );
    message.reply({ embeds: [equipEmbed] });
  },
};

function equipItem(player, item) {
  // Implement equipping logic
  // Update player stats based on the equipped item
}
