// commands/utility/shop.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const itemData = require('../../data/items');

module.exports = {
  name: 'shop',
  description: 'View the shop',
  execute(message) {
    const player = playerData[message.author.id];
    const shopItems = getShopItems(); // Placeholder function

    if (shopItems.length === 0) {
      const emptyEmbed = createEmbed(
        'Shop',
        'The shop is currently empty.'
      );
      return message.reply({ embeds: [emptyEmbed] });
    }

    const shopEmbed = createEmbed(
      'Shop',
      'Here are the items available in the shop:'
    );

    shopItems.forEach(item => {
      shopEmbed.addField(item.name, `${item.description}\nPrice: ${item.price} gold`, true);
    });

    message.reply({ embeds: [shopEmbed] });
  },
};

function getShopItems() {
  // Implement logic to retrieve items available in the shop
  return []; // Placeholder
}
