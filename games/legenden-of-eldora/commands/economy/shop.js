// commands/economy/shop.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const shopData = require('../../data/shops');

module.exports = {
  name: 'shop',
  description: 'Browse and purchase items from the shop',
  execute(message, args) {
    const player = playerData[message.author.id];
    const shopName = args[0];

    if (!shopName) {
      return message.reply('You must specify a shop to browse!');
    }

    const shop = shopData[shopName];

    if (!shop) {
      return message.reply(`${shopName} is not a valid shop!`);
    }

    // Display shop items
    const shopEmbed = createEmbed(
      `${shop.name} Shop`,
      'Here are the items available in the shop:'
    );

    shop.items.forEach(item => {
      shopEmbed.addField(
        item.name,
        `Price: ${item.price}\n${item.description}`,
        true
      );
    });

    message.reply({ embeds: [shopEmbed] });
  },
};
