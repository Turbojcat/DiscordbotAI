// commands/housing/house.js
const { createEmbed } = require('../../utils/embeds');
const playerData = require('../../data/players');
const houseData = require('../../data/houses');

module.exports = {
  name: 'house',
  description: 'Manage your house',
  execute(message, args) {
    const player = playerData[message.author.id];
    const subcommand = args[0];

    if (!subcommand) {
      // Display house information
      const house = player.house;

      if (!house) {
        const noHouseEmbed = createEmbed(
          'House',
          'You do not own a house.'
        );
        return message.reply({ embeds: [noHouseEmbed] });
      }

      const houseInfo = houseData[house];
      const houseEmbed = createEmbed(
        'House Information',
        `Here are the details of your house:`,
        [
          { name: 'Name', value: houseInfo.name, inline: true },
          { name: 'Size', value: houseInfo.size, inline: true },
          { name: 'Rooms', value: houseInfo.rooms.length.toString(), inline: true },
          // Add more house details as needed
        ]
      );

      message.reply({ embeds: [houseEmbed] });
    } else if (subcommand === 'buy') {
      // Buy a new house
      buyHouse(player, args[1]);
    } else if (subcommand === 'upgrade') {
      // Upgrade the current house
      upgradeHouse(player);
    } else if (subcommand === 'decorate') {
      // Decorate a room in the house
      decorateRoom(player, args[1], args[2]);
    }
  },
};

function buyHouse(player, houseName) {
  // Implement house buying logic
}

function upgradeHouse(player) {
  // Implement house upgrading logic
}

function decorateRoom(player, roomName, decorationName) {
  // Implement room decoration logic
}
